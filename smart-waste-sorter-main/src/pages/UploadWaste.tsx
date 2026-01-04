import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ImageUpload';
import { ClassificationResults } from '@/components/ClassificationResults';
import { wasteClassificationService } from '@/services/wasteClassificationService';
import { WasteClassificationResult } from '@/lib/wasteClassification';
import { 
  Camera, 
  CheckCircle,
  Lightbulb,
  Sun,
  Target,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';

const UploadWaste = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [classificationResult, setClassificationResult] = useState<WasteClassificationResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImageHash, setProcessedImageHash] = useState<string | null>(null);

  const generateImageHash = (file: File): string => {
    return `${file.name}_${file.size}_${file.type}`;
  };

  const handleClassification = async (file: File) => {
    // Prevent duplicate processing
    if (isProcessing) {
      console.log('Already processing, ignoring duplicate request');
      return;
    }

    const imageHash = generateImageHash(file);
    
    // Check if this exact image was already processed
    if (processedImageHash === imageHash && classificationResult) {
      console.log('Same image already processed, showing existing result');
      return;
    }

    setIsProcessing(true);
    setClassificationResult(null);
    setProcessedImageHash(imageHash);
    
    try {
      const result = await wasteClassificationService.classifyWaste(file);
      setClassificationResult(result);
      
      if (result.success) {
        toast.success('Classification completed successfully!');
      } else {
        toast.error(result.error || 'Classification failed');
      }
    } catch (error) {
      toast.error('An error occurred during classification');
      console.error('Classification error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setClassificationResult(null);
    setProcessedImageHash(null);
  };

  const resetClassification = () => {
    setSelectedFile(null);
    setClassificationResult(null);
    setProcessedImageHash(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            AI Analysis
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-foreground">
            Upload Your Waste Image
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload an image of your waste item. Our AI-powered system will analyze it with 80%+ confidence 
            and provide exact classification into Organic, Recyclable, or Hazardous waste categories.
          </p>
        </div>
      </section>

      {/* Upload Area */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Zone */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Upload Waste Image
              </h2>

              <ImageUpload
                onImageSelect={handleImageSelect}
                onClassify={handleClassification}
                isProcessing={isProcessing}
                selectedFile={selectedFile}
              />

              {selectedFile && (
                <Button
                  onClick={() => handleClassification(selectedFile)}
                  disabled={isProcessing || processedImageHash === generateImageHash(selectedFile)}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : processedImageHash === generateImageHash(selectedFile) ? (
                    'Already Analyzed'
                  ) : (
                    'Classify Waste'
                  )}
                </Button>
              )}
            </div>

            {/* Result Zone */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Classification Result
              </h2>

              {classificationResult ? (
                <ClassificationResults result={classificationResult} />
              ) : (
                <div className="rounded-2xl border border-border bg-muted/30 p-12 text-center">
                  <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">
                    No Classification Yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image and click "Classify Waste" to see the AI-powered classification result.
                  </p>
                </div>
              )}
              
              {classificationResult && (
                <Button
                  onClick={resetClassification}
                  variant="outline"
                  className="w-full"
                >
                  Classify Another Item
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Strict Classification Rules
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800">Organic Waste</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Only biodegradable items from plants or animals
              </p>
              <div className="text-xs text-green-700">
                <strong>Allowed:</strong> Food waste, leaves, grass, egg shells<br/>
                <strong>Forbidden:</strong> Plastic, glass, metal, chemicals
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Layers className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-800">Recyclable Waste</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Only reusable materials that can be processed
              </p>
              <div className="text-xs text-blue-700">
                <strong>Allowed:</strong> Clean plastic, glass, metal, cardboard<br/>
                <strong>Forbidden:</strong> Food-stained items, medical waste
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <Target className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-red-800">Hazardous Waste</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Only toxic, harmful, or dangerous items
              </p>
              <div className="text-xs text-red-700">
                <strong>Allowed:</strong> Batteries, e-waste, chemicals, medical waste<br/>
                <strong>Forbidden:</strong> Regular household items, food waste
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <Sun className="h-4 w-4" />
              Minimum 80% confidence required for valid classification
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UploadWaste;
