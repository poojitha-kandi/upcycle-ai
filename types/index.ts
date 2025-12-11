export type Style = 'Boho' | 'Modern' | 'Minimalist';

export interface AnalysisRequest {
  image: string; // base64 encoded image
  style: Style;
  budget: number;
}

export interface DIYSuggestion {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  materials: string[];
  steps: string[];
  sustainabilityScore: number;
}

export interface AnalysisResponse {
  success: boolean;
  suggestions: DIYSuggestion[];
  error?: string;
}
