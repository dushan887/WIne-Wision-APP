// WordPress API endpoints
export const WP_API_BASE = 'https://dev6.dushan887mob3.com/wp-json/';

export const API_ENDPOINTS = {
  // WordPress REST API v2
  WP_V2: `${WP_API_BASE}wp/v2/`,
  
  // Custom auth endpoints (if using JWT or custom auth plugin)
  AUTH: {
    LOGIN: `${WP_API_BASE}wp/v2/auth/login`,
    REGISTER: `${WP_API_BASE}wp/v2/auth/register`,
    REFRESH: `${WP_API_BASE}wp/v2/auth/refresh`,
    LOGOUT: `${WP_API_BASE}wp/v2/auth/logout`,
  },
  
  // User endpoints
  USERS: {
    ME: `${WP_API_BASE}wp/v2/users/me`,
    PROFILE: `${WP_API_BASE}wp/v2/users/me`,
    UPDATE: `${WP_API_BASE}wp/v2/users/me`,
  },
  
  // Content endpoints
  POSTS: `${WP_API_BASE}wp/v2/posts`,
  PAGES: `${WP_API_BASE}wp/v2/pages`,
  MEDIA: `${WP_API_BASE}wp/v2/media`,
  
  // Custom post types (if defined in WordPress)
  EXHIBITORS: `${WP_API_BASE}wp/v2/exhibitors`,
  EVENTS: `${WP_API_BASE}wp/v2/events`,
  ANNOUNCEMENTS: `${WP_API_BASE}wp/v2/announcements`,
};

// Wine Vision specific color palette
export const COLORS = {
  // Primary wine colors
  wine: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#7c2d12', // Main wine color
    700: '#451a03',
    800: '#292524',
    900: '#1c1917',
  },
  
  // Secondary colors
  gold: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

// Typography
export const TYPOGRAPHY = {
  fonts: {
    primary: 'Inter', // Main font
    secondary: 'Wine-Vision', // Custom font from Icomoon
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Screen breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// App configuration
export const APP_CONFIG = {
  name: 'Wine Vision',
  version: '1.0.0',
  apiTimeout: 10000,
  refreshTokenThreshold: 5 * 60 * 1000, // 5 minutes
  
  // Feature flags
  features: {
    push_notifications: true,
    offline_mode: false,
    analytics: true,
  },
  
  // Storage keys
  storage: {
    auth_token: 'authToken',
    user_data: 'userData',
    app_settings: 'appSettings',
  },
};
