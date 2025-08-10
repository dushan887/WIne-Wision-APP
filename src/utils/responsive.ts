import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';

/**
 * Responsive design utilities for Wine Vision app
 * Provides consistent spacing, typography, and layout across different screen sizes
 */

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Breakpoints for responsive design
export const RESPONSIVE_BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// Device type detection
export const getDeviceType = () => {
  if (SCREEN_WIDTH < RESPONSIVE_BREAKPOINTS.sm) return 'mobile';
  if (SCREEN_WIDTH < RESPONSIVE_BREAKPOINTS.md) return 'mobile-large';
  if (SCREEN_WIDTH < RESPONSIVE_BREAKPOINTS.lg) return 'tablet';
  return 'desktop';
};

// Check if device is tablet
export const isTablet = () => {
  const deviceType = getDeviceType();
  return deviceType === 'tablet' || deviceType === 'desktop';
};

// Check if device is mobile
export const isMobile = () => {
  const deviceType = getDeviceType();
  return deviceType === 'mobile' || deviceType === 'mobile-large';
};

// Responsive font sizing
export const responsiveFontSize = (size: number): number => {
  const scale = SCREEN_WIDTH / 375; // Base width (iPhone X)
  const newSize = size * scale;
  
  // Limit font scaling
  const minSize = size * 0.8;
  const maxSize = size * 1.2;
  
  return Math.max(minSize, Math.min(maxSize, newSize));
};

// Responsive spacing
export const responsiveSpacing = {
  xs: () => responsiveFontSize(4),
  sm: () => responsiveFontSize(8),
  md: () => responsiveFontSize(16),
  lg: () => responsiveFontSize(24),
  xl: () => responsiveFontSize(32),
  xxl: () => responsiveFontSize(48),
};

// Responsive dimensions
export const responsiveWidth = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

export const responsiveHeight = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Get responsive padding based on device type
export const getResponsivePadding = () => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return {
        horizontal: 16,
        vertical: 12,
        container: 20,
      };
    case 'mobile-large':
      return {
        horizontal: 20,
        vertical: 16,
        container: 24,
      };
    case 'tablet':
      return {
        horizontal: 32,
        vertical: 24,
        container: 40,
      };
    case 'desktop':
      return {
        horizontal: 48,
        vertical: 32,
        container: 60,
      };
    default:
      return {
        horizontal: 16,
        vertical: 12,
        container: 20,
      };
  }
};

// Get responsive margins
export const getResponsiveMargin = () => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
      };
    case 'mobile-large':
      return {
        xs: 6,
        sm: 10,
        md: 16,
        lg: 20,
        xl: 24,
      };
    case 'tablet':
      return {
        xs: 8,
        sm: 12,
        md: 20,
        lg: 28,
        xl: 32,
      };
    case 'desktop':
      return {
        xs: 10,
        sm: 16,
        md: 24,
        lg: 32,
        xl: 40,
      };
    default:
      return {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
      };
  }
};

// Responsive grid layout
export const getGridColumns = () => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return 1;
    case 'mobile-large':
      return 2;
    case 'tablet':
      return 3;
    case 'desktop':
      return 4;
    default:
      return 1;
  }
};

// Responsive component sizes
export const getComponentSizes = () => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return {
        button: { height: 44, padding: 12 },
        input: { height: 48, padding: 16 },
        card: { minHeight: 120, padding: 16 },
        header: { height: 60, padding: 16 },
        modal: { maxWidth: '95%', padding: 20 },
      };
    case 'mobile-large':
      return {
        button: { height: 48, padding: 16 },
        input: { height: 52, padding: 18 },
        card: { minHeight: 140, padding: 20 },
        header: { height: 64, padding: 20 },
        modal: { maxWidth: '90%', padding: 24 },
      };
    case 'tablet':
      return {
        button: { height: 52, padding: 20 },
        input: { height: 56, padding: 20 },
        card: { minHeight: 160, padding: 24 },
        header: { height: 72, padding: 24 },
        modal: { maxWidth: '80%', padding: 32 },
      };
    case 'desktop':
      return {
        button: { height: 56, padding: 24 },
        input: { height: 60, padding: 24 },
        card: { minHeight: 180, padding: 32 },
        header: { height: 80, padding: 32 },
        modal: { maxWidth: '60%', padding: 40 },
      };
    default:
      return {
        button: { height: 44, padding: 12 },
        input: { height: 48, padding: 16 },
        card: { minHeight: 120, padding: 16 },
        header: { height: 60, padding: 16 },
        modal: { maxWidth: '95%', padding: 20 },
      };
  }
};

// Typography scale
export const getTypographyScale = () => {
  const deviceType = getDeviceType();
  const baseScale = isMobile() ? 0.9 : isTablet() ? 1.1 : 1.2;
  
  return {
    h1: responsiveFontSize(32 * baseScale),
    h2: responsiveFontSize(28 * baseScale),
    h3: responsiveFontSize(24 * baseScale),
    h4: responsiveFontSize(20 * baseScale),
    h5: responsiveFontSize(18 * baseScale),
    h6: responsiveFontSize(16 * baseScale),
    body: responsiveFontSize(16 * baseScale),
    bodySmall: responsiveFontSize(14 * baseScale),
    caption: responsiveFontSize(12 * baseScale),
    overline: responsiveFontSize(10 * baseScale),
  };
};

// Orientation utilities
export const useOrientation = () => {
  const [orientation, setOrientation] = React.useState(
    SCREEN_WIDTH > SCREEN_HEIGHT ? 'landscape' : 'portrait'
  );

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setOrientation(screen.width > screen.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  return orientation;
};

// Safe area utilities
export const getSafeAreaPadding = () => {
  const deviceType = getDeviceType();
  
  // Base safe area padding
  const basePadding = {
    top: 44, // For notched devices
    bottom: 34, // For home indicator
    left: 0,
    right: 0,
  };

  // Adjust for device type
  if (isTablet()) {
    return {
      ...basePadding,
      top: Math.max(basePadding.top, 20),
      bottom: Math.max(basePadding.bottom, 20),
    };
  }

  return basePadding;
};

// Accessibility utilities
export const getAccessibilitySize = (size: 'small' | 'medium' | 'large') => {
  const scale = PixelRatio.getFontScale();
  
  const baseSizes = {
    small: 14,
    medium: 16,
    large: 18,
  };

  return baseSizes[size] * scale;
};

// Layout utilities
export const getLayoutConstraints = () => {
  const deviceType = getDeviceType();
  
  return {
    maxContentWidth: deviceType === 'desktop' ? 1200 : SCREEN_WIDTH,
    sidebarWidth: isTablet() ? 280 : SCREEN_WIDTH * 0.8,
    minTouchTarget: 44, // iOS HIG minimum
    contentPadding: getResponsivePadding().container,
  };
};

// Responsive hook for dynamic updates
export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = React.useState(() => ({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  }));

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    return () => subscription?.remove();
  }, []);

  return {
    ...dimensions,
    deviceType: getDeviceType(),
    isTablet: isTablet(),
    isMobile: isMobile(),
    padding: getResponsivePadding(),
    margin: getResponsiveMargin(),
    componentSizes: getComponentSizes(),
    typography: getTypographyScale(),
    layoutConstraints: getLayoutConstraints(),
  };
};

// Export all utilities
export const ResponsiveUtils = {
  getDeviceType,
  isTablet,
  isMobile,
  responsiveFontSize,
  responsiveSpacing,
  responsiveWidth,
  responsiveHeight,
  getResponsivePadding,
  getResponsiveMargin,
  getGridColumns,
  getComponentSizes,
  getTypographyScale,
  getSafeAreaPadding,
  getAccessibilitySize,
  getLayoutConstraints,
  RESPONSIVE_BREAKPOINTS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
