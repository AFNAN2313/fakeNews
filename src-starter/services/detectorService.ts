/**
 * detectorService — all calls to the HuggingFace-hosted ML API
 * Base URL: https://afnanazhar-fake-news-detector.hf.space
 */

const BASE_URL = 'https://afnanazhar-fake-news-detector.hf.space';

export type ModelName = 'logistic' | 'naive_bayes' | 'random_forest' | 'svm' | 'lstm' | 'bilstm';

export interface HealthResponse {
  status: string;
  models_ready: boolean;
  models_loaded: string[];
}

export interface PredictResponse {
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  confidence_pct: string;
  model_used: string;
  word_count: number;
  response_ms: number;
  status: string;
}

export interface ModelPrediction {
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  confidence_pct: string;
}

export interface PredictAllResponse {
  results: Record<ModelName, ModelPrediction>;
  majority_vote: 'REAL' | 'FAKE';
  votes: { REAL: number; FAKE: number };
  bilstm_verdict: 'REAL' | 'FAKE';
  word_count: number;
  response_ms: number;
  status: string;
}

export interface ExplainFeature {
  word: string;
  weight: number;
  direction: 'REAL' | 'FAKE';
}

export interface ExplainResponse {
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  features: ExplainFeature[];
  model_used: string;
  response_ms: number;
  status: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || `Request failed: ${res.status}`);
  }
  return json as T;
}

export const detectorService = {
  checkHealth(): Promise<HealthResponse> {
    return apiFetch<HealthResponse>('/health');
  },

  predict(text: string, model: ModelName = 'bilstm'): Promise<PredictResponse> {
    return apiFetch<PredictResponse>('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model }),
    });
  },

  predictAll(text: string): Promise<PredictAllResponse> {
    return apiFetch<PredictAllResponse>('/predict/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  },

  explain(text: string, numFeatures = 10, numSamples = 100): Promise<ExplainResponse> {
    return apiFetch<ExplainResponse>('/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, num_features: numFeatures, num_samples: numSamples }),
    });
  },
};
