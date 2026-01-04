import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import { WasteClassificationResult } from '@/lib/wasteClassification';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onClassify: (file: File) => void;
  isProcessing: boolean;
  selectedFile: File | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelect,
  onClassify,
  isProcessing,
  selectedFile
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Clear previous state
      setSelectedImage(null);
      setCurrentFile(null);
      
      setCurrentFile(file);
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setCurrentFile(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
        <CardContent className="p-8">
          {selectedImage ? (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Waste to classify"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={clearImage}
                  disabled={isProcessing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Image ready for classification
                </p>
                <Button
                  onClick={() => {
                    if (currentFile && !isProcessing && !isAnalyzing) {
                      setIsAnalyzing(true);
                      onClassify(currentFile);
                    }
                  }}
                  disabled={isProcessing || isAnalyzing}
                  size="lg"
                  className="w-full"
                >
                  {isProcessing || isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    'Classify Waste'
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`text-center space-y-4 p-8 rounded-lg border-2 transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border/50 hover:border-primary/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Upload Waste Image
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop an image here, or click to browse
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
                <Button
                  onClick={handleCameraCapture}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, WebP, GIF (Max 10MB)
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        capture="environment"
      />
    </div>
  );
};
