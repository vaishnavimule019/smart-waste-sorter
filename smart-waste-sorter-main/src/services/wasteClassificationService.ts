import { WasteCategory, WasteClassificationResult, WASTE_RULES, DISPOSAL_INSTRUCTIONS } from '../lib/wasteClassification';

// Simulated CNN model prediction
class WasteClassificationModel {
  private readonly organicFeatures = [
    'food', 'fruit', 'vegetable', 'organic', 'natural', 'biodegradable',
    'leaves', 'grass', 'plant', 'cooked', 'spoiled', 'egg', 'bread', 'rice'
  ];
  
  private readonly recyclableFeatures = [
    'plastic', 'bottle', 'container', 'glass', 'metal', 'can', 'cardboard',
    'paper', 'tetra', 'packaging', 'clean', 'dry', 'PET', 'HDPE'
  ];
  
  private readonly hazardousFeatures = [
    'battery', 'electronic', 'e-waste', 'medical', 'chemical', 'paint',
    'pesticide', 'broken', 'sharp', 'toxic', 'hazardous', 'CFL', 'medicine'
  ];

  private readonly nonWasteFeatures = [
    'human', 'person', 'people', 'animal', 'pet', 'dog', 'cat', 'bird',
    'building', 'house', 'car', 'vehicle', 'tree', 'flower', 'sky', 'cloud',
    'road', 'street', 'furniture', 'clothing', 'book', 'phone', 'computer'
  ];

  async analyzeImage(imageData: File): Promise<{ category: WasteCategory; confidence: number; features: string[]; isUncertain: boolean }> {
    // Simulate image analysis with feature extraction
    const features = await this.extractFeatures(imageData);
    
    // Check if image contains non-waste items
    const hasNonWasteFeatures = features.some(f => 
      this.nonWasteFeatures.some(nonWaste => f.toLowerCase().includes(nonWaste.toLowerCase()))
    );
    
    if (hasNonWasteFeatures) {
      return {
        category: 'Organic', // Default fallback
        confidence: 0.3, // Low confidence for uncertain images
        features,
        isUncertain: true
      };
    }
    
    const scores = this.calculateCategoryScores(features);
    
    let bestCategory: WasteCategory = 'Organic';
    let bestScore = 0;
    
    for (const [category, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category as WasteCategory;
      }
    }
    
    return {
      category: bestCategory,
      confidence: bestScore,
      features,
      isUncertain: false
    };
  }

  private async extractFeatures(imageData: File): Promise<string[]> {
    // Simulate feature extraction from image
    // In a real implementation, this would use TensorFlow.js or similar
    const fileName = imageData.name.toLowerCase();
    const fileSize = imageData.size;
    const fileType = imageData.type;
    
    const features: string[] = [];
    
    // Extract features from filename
    if (fileName.includes('food') || fileName.includes('organic')) features.push('food');
    if (fileName.includes('plastic') || fileName.includes('bottle')) features.push('plastic');
    if (fileName.includes('battery') || fileName.includes('electronic')) features.push('electronic');
    if (fileName.includes('paper') || fileName.includes('cardboard')) features.push('paper');
    if (fileName.includes('glass')) features.push('glass');
    if (fileName.includes('metal') || fileName.includes('can')) features.push('metal');
    if (fileName.includes('medical') || fileName.includes('chemical')) features.push('chemical');
    
    // Simulate random feature detection based on file characteristics
    const hash = this.simpleHash(fileName + fileSize);
    const randomFeatures = this.generateRandomFeatures(hash);
    features.push(...randomFeatures);
    
    return features;
  }

  private calculateCategoryScores(features: string[]): Record<WasteCategory, number> {
    const scores = {
      Organic: 0,
      Recyclable: 0,
      Hazardous: 0
    };

    for (const feature of features) {
      if (this.organicFeatures.includes(feature)) {
        scores.Organic += 0.4; // Increased weight for organic
      }
      if (this.recyclableFeatures.includes(feature)) {
        scores.Recyclable += 0.4; // Increased weight for recyclable
      }
      if (this.hazardousFeatures.includes(feature)) {
        scores.Hazardous += 0.4; // Increased weight for hazardous
      }
    }

    // Add smaller randomness to simulate model uncertainty
    const randomFactor = Math.random() * 0.1; // Reduced from 0.2
    for (const category of Object.keys(scores) as WasteCategory[]) {
      scores[category] += randomFactor;
    }

    // Normalize scores to 0-1 range
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
      for (const category of Object.keys(scores) as WasteCategory[]) {
        scores[category] = scores[category] / maxScore;
      }
    }

    return scores;
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private generateRandomFeatures(hash: number): string[] {
    const allFeatures = [
      ...this.organicFeatures,
      ...this.recyclableFeatures,
      ...this.hazardousFeatures
    ];
    
    const features: string[] = [];
    const numFeatures = (hash % 2) + 1; // Reduced from 3 to 2 max features
    
    for (let i = 0; i < numFeatures; i++) {
      const index = (hash + i) % allFeatures.length;
      features.push(allFeatures[index]);
    }
    
    return features;
  }
}

// Strict validation system
class WasteValidator {
  static validateClassification(
    category: WasteCategory,
    confidence: number,
    features: string[],
    isUncertain: boolean
  ): { isValid: boolean; reason?: string } {
    // Check if image is uncertain/non-waste
    if (isUncertain) {
      return { isValid: false, reason: 'Uncertain image – not identifiable as waste.' };
    }
    
    // Check confidence threshold
    if (confidence < 0.8) {
      return { isValid: false, reason: 'Image unclear. Please upload a clearer waste image.' };
    }

    // Apply strict rule-based validation
    const rules = WASTE_RULES[category.toLowerCase() as keyof typeof WASTE_RULES];
    
    // Check for forbidden items
    for (const forbidden of rules.forbidden) {
      if (features.some(f => f.toLowerCase().includes(forbidden.toLowerCase()))) {
        return { isValid: false, reason: `Contains forbidden item: ${forbidden}` };
      }
    }

    // Check for allowed items
    const hasAllowedFeatures = features.some(f => 
      rules.allowed.some(allowed => f.toLowerCase().includes(allowed.toLowerCase()))
    );
    
    if (!hasAllowedFeatures) {
      return { isValid: false, reason: 'No recognizable waste features found' };
    }

    return { isValid: true };
  }
}

// Main classification service
export class WasteClassificationService {
  private model = new WasteClassificationModel();

  async classifyWaste(imageData: File): Promise<WasteClassificationResult> {
    try {
      // Validate input
      if (!imageData) {
        return {
          success: false,
          error: 'No image provided',
          wasteType: 'Organic',
          confidence: 0,
          disposalInstruction: ''
        };
      }

      // Check file type
      if (!imageData.type.startsWith('image/')) {
        return {
          success: false,
          error: 'Invalid file type. Please upload an image.',
          wasteType: 'Organic',
          confidence: 0,
          disposalInstruction: ''
        };
      }

      // Analyze image
      const prediction = await this.model.analyzeImage(imageData);
      
      // Validate prediction
      const validation = WasteValidator.validateClassification(
        prediction.category,
        prediction.confidence,
        prediction.features,
        prediction.isUncertain
      );

      if (!validation.isValid) {
        return {
          success: false,
          error: validation.reason || 'Unable to classify. Please upload a clearer image.',
          wasteType: 'Organic',
          confidence: 0,
          disposalInstruction: ''
        };
      }

      // Return successful classification
      return {
        success: true,
        wasteType: prediction.category,
        confidence: Math.round(prediction.confidence * 100),
        disposalInstruction: DISPOSAL_INSTRUCTIONS[prediction.category]
      };

    } catch (error) {
      return {
        success: false,
        error: 'Classification failed. Please try again.',
        wasteType: 'Organic',
        confidence: 0,
        disposalInstruction: ''
      };
    }
  }
}

export const wasteClassificationService = new WasteClassificationService();
