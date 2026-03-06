export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DETECTOR: '/detector',
  DASHBOARD: '/dashboard',
  ANALYZE: '/analyze',
  HISTORY: '/history',
  ANALYSIS_DETAIL: '/analysis/:id',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND: '/404',
} as const;

export type RouteKey = keyof typeof ROUTES;

// Helper function to get route path
export const getRoutePath = (key: RouteKey): string => {
  return ROUTES[key];
};
