// Common types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface AnalysisResult {
  prediction: 'real' | 'fake';
  confidence: number;
  keywords: string[];
  processingTime: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
