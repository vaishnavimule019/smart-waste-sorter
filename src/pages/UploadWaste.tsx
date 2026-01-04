import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  X, 
  Loader2,
  CheckCircle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

type WasteCategory = 'recyclable' | 'organic' | 'hazardous';

interface AnalysisResult {
  category: WasteCategory;
  confidence: number;
  disposal: string;
}

const wasteData: Record<WasteCategory, { icon: string; color: string; disposal: string }> = {
  recyclable: {
    icon: '♻️',
    color: 'recyclable',
    disposal: 'Dispose in the green recycling bin. Ensure items are clean and dry before recycling.',
  },
  organic: {
    icon: '🌱',
    color: 'organic',
    disposal: 'Use the brown compost bin. This waste will decompose naturally and create nutrient-rich soil.',
  },
  hazardous: {
    icon: '⚠️',
    color: 'hazardous',
    disposal: 'Dispose at a designated hazardous waste collection center. Never throw in regular trash.',
  },
};

const UploadWaste = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const analyzeWaste = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with random result
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const categories: WasteCategory[] = ['recyclable', 'organic', 'hazardous'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const confidence = 85 + Math.random() * 14; // 85-99%

    const analysisResult: AnalysisResult = {
      category: randomCategory,
      confidence: Math.round(confidence * 10) / 10,
      disposal: wasteData[randomCategory].disposal,
    };

    setResult(analysisResult);
    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
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
            Take a photo or upload an image of your waste item. Our AI will analyze it 
            and tell you exactly how to dispose of it properly.
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
                Upload Image
              </h2>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative aspect-square rounded-2xl border-2 border-dashed cursor-pointer
                  transition-all duration-300 overflow-hidden
                  ${isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                  }
                  ${selectedImage ? 'border-solid border-primary' : ''}
                `}
              >
                {selectedImage ? (
                  <>
                    <img 
                      src={selectedImage} 
                      alt="Selected waste" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearImage();
                      }}
                      className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                    >
                      <X className="h-5 w-5 text-foreground" />
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium text-foreground mb-2">
                      Drag & drop your image here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supports: JPG, PNG, WEBP (max 10MB)
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              <Button
                onClick={analyzeWaste}
                disabled={!selectedImage || isAnalyzing}
                variant="hero"
                size="lg"
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Waste
                  </>
                )}
              </Button>
            </div>

            {/* Result Zone */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Analysis Result
              </h2>

              {result ? (
                <div className="rounded-2xl border border-border bg-card overflow-hidden animate-scale-in">
                  {/* Category Header */}
                  <div className={`p-6 ${
                    result.category === 'recyclable' ? 'bg-recyclable' :
                    result.category === 'organic' ? 'bg-organic' : 'bg-hazardous'
                  } text-center`}>
                    <span className="text-5xl mb-4 block">
                      {wasteData[result.category].icon}
                    </span>
                    <h3 className="text-2xl font-bold text-primary-foreground capitalize">
                      {result.category} Waste
                    </h3>
                    <p className="text-primary-foreground/80 mt-1">
                      Detected with {result.confidence}% confidence
                    </p>
                  </div>

                  {/* Disposal Instructions */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-primary" />
                        Disposal Instructions
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {result.disposal}
                      </p>
                    </div>

                    {/* Confidence Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Confidence Level</span>
                        <span className="font-medium text-foreground">{result.confidence}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            result.category === 'recyclable' ? 'bg-recyclable' :
                            result.category === 'organic' ? 'bg-organic' : 'bg-hazardous'
                          }`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={clearImage}
                      variant="outline"
                      className="w-full mt-4"
                    >
                      Analyze Another Item
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-muted/30 p-12 text-center">
                  <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">
                    No Results Yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image and click "Analyze Waste" to see the classification result.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Tips for Better Results
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Good Lighting',
                description: 'Ensure your image is well-lit and clear for accurate analysis.',
              },
              {
                title: 'Single Item',
                description: 'Focus on one waste item at a time for better classification.',
              },
              {
                title: 'Clean Background',
                description: 'Use a plain background to help the AI focus on the waste item.',
              },
            ].map((tip) => (
              <div key={tip.title} className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UploadWaste;
