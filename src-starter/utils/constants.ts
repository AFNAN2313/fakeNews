// App constants

// Validation constraints
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  NEWS_TEXT_MIN_LENGTH: 20,
  NEWS_TEXT_MAX_LENGTH: 5000,
};

// API configuration
export const API = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'fake_news_auth_token',
  USER_DATA: 'fake_news_user_data',
  PREFERENCES: 'fake_news_preferences',
  RECENT_ANALYSES: 'fake_news_recent_analyses',
};

// Demo credentials
export const DEMO = {
  EMAIL: 'demo@example.com',
  PASSWORD: 'DemoPassword123',
  USERNAME: 'demouser',
};

// Confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.8,
  MEDIUM: 0.5,
  LOW: 0.2,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'User with this email already exists.',
  INVALID_INPUT: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please log in to continue.',
  NOT_FOUND: 'Resource not found.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  ANALYSIS_COMPLETE: 'Analysis completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

// Routes
export const APP_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DETECTOR: '/detector',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
};
