export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',

  // Analysis endpoints
  ANALYZE: '/analyze',
  HISTORY: '/history',

  // Public endpoints
  HEALTH: '/health',
};
