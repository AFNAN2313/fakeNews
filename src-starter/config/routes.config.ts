export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DETECTOR: '/detector',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
} as const;

export type RouteKey = keyof typeof ROUTES;

// Helper function to get route path
export const getRoutePath = (key: RouteKey): string => {
  return ROUTES[key];
};
