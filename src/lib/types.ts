export interface PredictionFeature {
  feature: string;
  value: string | number | boolean;
  explanation: string;
  weight: number;
  score: number;
}

export interface PredictionResult {
  label: 'phishing' | 'legitimate';
  confidence: number;
  top_reasons: PredictionFeature[];
  model_version: string;
  timestamp: string;
}

export interface HistoryItem {
  url: string;
  verdict: 'phishing' | 'legitimate';
  timestamp: string;
}

export interface ModelInfo {
  version: string;
  features: {
    name: string;
    description: string;
    weight: number;
  }[];
}
