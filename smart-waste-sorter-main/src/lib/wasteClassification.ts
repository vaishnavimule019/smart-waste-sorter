export type WasteCategory = 'Organic' | 'Recyclable' | 'Hazardous';

export interface WasteClassificationResult {
  wasteType: WasteCategory;
  confidence: number;
  disposalInstruction: string;
  success: boolean;
  error?: string;
}

export interface WasteValidationRules {
  organic: {
    allowed: string[];
    forbidden: string[];
    characteristics: string[];
  };
  recyclable: {
    allowed: string[];
    forbidden: string[];
    characteristics: string[];
  };
  hazardous: {
    allowed: string[];
    forbidden: string[];
    characteristics: string[];
  };
}

export const WASTE_RULES: WasteValidationRules = {
  organic: {
    allowed: [
      'food leftovers', 'fruit peels', 'vegetable peels', 'cooked food', 
      'egg shells', 'tea bags', 'coffee grounds', 'leaves', 'grass', 
      'flowers', 'bread', 'rice', 'roti', 'spoiled food', 'food waste',
      'biodegradable', 'natural', 'plant-based', 'animal-based'
    ],
    forbidden: [
      'plastic bags', 'paper cups', 'plastic-coated', 'aluminum foil',
      'glass', 'metal', 'electronics', 'batteries', 'chemicals'
    ],
    characteristics: [
      'biodegradable', 'natural', 'decomposable', 'organic matter',
      'food residue', 'plant material', 'animal material'
    ]
  },
  recyclable: {
    allowed: [
      'plastic bottles', 'plastic containers', 'glass bottles', 'metal cans',
      'aluminum cans', 'steel cans', 'cardboard', 'newspapers', 'clean paper',
      'tetra packs', 'PET', 'HDPE', 'PVC', 'clean packaging'
    ],
    forbidden: [
      'food-stained paper', 'used tissues', 'medical waste', 'batteries',
      'chemicals', 'broken glass', 'food waste', 'greasy cardboard'
    ],
    characteristics: [
      'reusable', 'processable', 'clean', 'dry', 'non-contaminated',
      'recyclable material', 'synthetic but recyclable'
    ]
  },
  hazardous: {
    allowed: [
      'batteries', 'e-waste', 'phones', 'chargers', 'wires', 'medical waste',
      'syringes', 'masks', 'gloves', 'chemicals', 'paint cans', 'pesticides',
      'broken glass', 'CFL bulbs', 'expired medicines', 'electronics'
    ],
    forbidden: [
      'food waste', 'organic matter', 'clean plastic', 'paper',
      'cardboard', 'normal household items'
    ],
    characteristics: [
      'toxic', 'harmful', 'flammable', 'sharp', 'electronic',
      'dangerous', 'contaminated', 'biohazard', 'chemical'
    ]
  }
};

export const DISPOSAL_INSTRUCTIONS = {
  Organic: 'Dispose in compost bin or green bin. Ensure proper composting conditions.',
  Recyclable: 'Dispose in dry waste or blue bin. Clean before disposal to avoid contamination.',
  Hazardous: 'Take to authorized hazardous waste center. Do not mix with regular waste.'
};

export const CATEGORY_COLORS = {
  Organic: 'text-green-600 bg-green-50 border-green-200',
  Recyclable: 'text-blue-600 bg-blue-50 border-blue-200',
  Hazardous: 'text-red-600 bg-red-50 border-red-200'
};
