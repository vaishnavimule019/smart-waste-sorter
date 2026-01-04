import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WasteClassificationResult, CATEGORY_COLORS } from '@/lib/wasteClassification';
import { 
  CheckCircle, 
  AlertTriangle, 
  Leaf, 
  Recycle, 
  AlertCircle,
  Info
} from 'lucide-react';

interface ClassificationResultsProps {
  result: WasteClassificationResult;
}

export const ClassificationResults: React.FC<ClassificationResultsProps> = ({ result }) => {
  if (!result.success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Classification Failed</h3>
              <p className="text-sm text-muted-foreground">
                {result.error || 'Unable to classify the image. Please try again.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCategoryIcon = (wasteType: string) => {
    switch (wasteType) {
      case 'Organic':
        return <Leaf className="h-6 w-6" />;
      case 'Recyclable':
        return <Recycle className="h-6 w-6" />;
      case 'Hazardous':
        return <AlertCircle className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (wasteType: string) => {
    switch (wasteType) {
      case 'Organic':
        return CATEGORY_COLORS.Organic;
      case 'Recyclable':
        return CATEGORY_COLORS.Recyclable;
      case 'Hazardous':
        return CATEGORY_COLORS.Hazardous;
      default:
        return CATEGORY_COLORS.Organic;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Classification Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Waste Type Display */}
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 ${getCategoryColor(result.wasteType)}`}>
            {getCategoryIcon(result.wasteType)}
            <div className="text-left">
              <div className="text-2xl font-bold">{result.wasteType}</div>
              <div className="text-sm opacity-75">Waste Type</div>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">Confidence Score</div>
          <div className={`text-3xl font-bold ${getConfidenceColor(result.confidence)}`}>
            {result.confidence}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                result.confidence >= 90 ? 'bg-green-500' :
                result.confidence >= 80 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Disposal Instructions */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-primary" />
            <h4 className="font-semibold">Disposal Instructions</h4>
          </div>
          <p className="text-sm leading-relaxed">{result.disposalInstruction}</p>
        </div>

        {/* Category Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
            <Leaf className="h-5 w-5 mx-auto mb-1 text-green-600" />
            <div className="text-xs font-medium text-green-800">Organic</div>
            <div className="text-xs text-green-600">Biodegradable</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Recycle className="h-5 w-5 mx-auto mb-1 text-blue-600" />
            <div className="text-xs font-medium text-blue-800">Recyclable</div>
            <div className="text-xs text-blue-600">Reusable</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="h-5 w-5 mx-auto mb-1 text-red-600" />
            <div className="text-xs font-medium text-red-800">Hazardous</div>
            <div className="text-xs text-red-600">Dangerous</div>
          </div>
        </div>

        {/* Validation Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Valid Classification (80%+ Confidence)
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
