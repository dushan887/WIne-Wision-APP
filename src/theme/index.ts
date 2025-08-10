/**
 * Wine Vision 2025 - Centralized Theme System
 * Consolidated from tailwind.config.js, wineVisionDesign.ts, and wvColors.ts
 */

// Core color values
const WineVisionColors = {
  // Carbon (Primary Dark)
  carbon: {
    base: 'rgb(11,5,28)',
    95: 'rgb(23,18,39)',
    90: 'rgb(35,30,51)',
    80: 'rgb(60,55,73)',
    70: 'rgb(84,80,96)',
    50: 'rgb(133,130,142)',
    20: 'rgb(206,205,210)',
    10: 'rgb(231,230,232)',
    5: 'rgb(243,243,244)',
    3: 'rgb(248,248,248)',
  },
  
  // Velvet (Exhibitor Purple)
  velvet: {
    dark: 'rgb(50,10,100)',
    base: 'rgb(110,15,215)',
    80: 'rgb(139,63,223)',
    70: 'rgb(154,87,227)',
    50: 'rgb(183,135,235)',
    20: 'rgb(226,207,247)',
    10: 'rgb(241,231,251)',
  },
  
  // Status Colors
  green: 'rgb(0,200,100)',
  green30: 'rgb(179,239,209)',
  green15: 'rgb(217,247,232)',
  
  blue: 'rgb(0,135,255)',
  blue70: 'rgb(77,171,255)',
  blue50: 'rgb(128,195,255)',
  blue20: 'rgb(204,231,255)',
  blue10: 'rgb(230,243,255)',
  
  yellow: 'rgb(250,165,0)',
  yellow50: 'rgb(253,210,128)',
  yellow20: 'rgb(254,237,204)',
  yellow10: 'rgb(255,246,230)',
  
  red: 'rgb(235,0,55)',
  red70: 'rgb(241,77,115)',
  red50: 'rgb(245,128,155)',
  red30: 'rgb(249,179,195)',
  
  hot: 'rgb(255,20,40)',
  hot70: 'rgb(255,91,105)',
  hot50: 'rgb(255,138,147)',
  hot10: 'rgb(255,232,234)',
  
  // Basic
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)',
  
  // Wine Product Colors
  wine: {
    white: 'rgb(200,160,120)',
    rose: 'rgb(255,140,170)',
    orange: 'rgb(250,110,60)',
    red: 'rgb(220,20,60)',
    sparkling: 'rgb(145,150,170)',
  },
  
  // Spirit Colors
  spirits: {
    plum: 'rgb(110,85,200)',
    quince: 'rgb(200,150,20)',
    pear: 'rgb(180,180,90)',
    grape: 'rgb(140,190,140)',
  },
  
  // Stand Size Colors
  stands: {
    '9m2': 'rgb(0,180,0)',
    '9m2_30': 'rgb(179,233,179)',
    '12m2': 'rgb(0,190,180)',
    '12m2_30': 'rgb(179,235,233)',
    '24m2': 'rgb(0,135,255)',
    '24m2_30': 'rgb(179,219,255)',
    '49m2': 'rgb(0,50,240)',
    '49m2_30': 'rgb(179,194,251)',
    custom: 'rgb(250,90,0)',
    custom_30: 'rgb(253,205,179)',
  },
};

// Font configuration
const fonts = {
  primary: {
    fontFamily: 'InterTight-VariableFont_wght',
  },
  primaryItalic: {
    fontFamily: 'InterTight-Italic-VariableFont_wght',
  },
  brand: {
    fontFamily: 'Wine-Vision',
  },
};

// Spacing scale
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
};

// Typography scale
const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 2,
  },
};

// Border radius scale
const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

// Shadow definitions
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Centralized theme object
export const theme = {
  colors: WineVisionColors,
  fonts,
  spacing,
  typography,
  borderRadius,
  shadows,
  
  // Style objects for easy consumption
  styles: {
    // Text colors
    text: {
      carbon: { color: WineVisionColors.carbon.base },
      carbon80: { color: WineVisionColors.carbon[80] },
      carbon70: { color: WineVisionColors.carbon[70] },
      carbon50: { color: WineVisionColors.carbon[50] },
      carbon20: { color: WineVisionColors.carbon[20] },
      velvet: { color: WineVisionColors.velvet.base },
      white: { color: WineVisionColors.white },
      green: { color: WineVisionColors.green },
      hot: { color: WineVisionColors.hot },
      yellow: { color: WineVisionColors.yellow },
      blue: { color: WineVisionColors.blue },
    },
    
    // Background colors
    bg: {
      carbon: { backgroundColor: WineVisionColors.carbon.base },
      carbon95: { backgroundColor: WineVisionColors.carbon[95] },
      carbon90: { backgroundColor: WineVisionColors.carbon[90] },
      carbon80: { backgroundColor: WineVisionColors.carbon[80] },
      carbon20: { backgroundColor: WineVisionColors.carbon[20] },
      carbon10: { backgroundColor: WineVisionColors.carbon[10] },
      carbon5: { backgroundColor: WineVisionColors.carbon[5] },
      velvet: { backgroundColor: WineVisionColors.velvet.base },
      velvet10: { backgroundColor: WineVisionColors.velvet[10] },
      white: { backgroundColor: WineVisionColors.white },
      green: { backgroundColor: WineVisionColors.green },
      green15: { backgroundColor: WineVisionColors.green15 },
      hot10: { backgroundColor: WineVisionColors.hot10 },
      yellow10: { backgroundColor: WineVisionColors.yellow10 },
      blue10: { backgroundColor: WineVisionColors.blue10 },
    },
    
    // Border colors  
    border: {
      carbon: { borderColor: WineVisionColors.carbon.base },
      carbon20: { borderColor: WineVisionColors.carbon[20] },
      carbon10: { borderColor: WineVisionColors.carbon[10] },
      velvet: { borderColor: WineVisionColors.velvet.base },
      velvet20: { borderColor: WineVisionColors.velvet[20] },
      hot: { borderColor: WineVisionColors.hot },
    },
    
    // Typography styles
    typography: {
      h1: {
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.bold as any,
        lineHeight: typography.lineHeight.tight,
        color: WineVisionColors.carbon.base,
        ...fonts.brand,
      },
      h2: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.semibold as any,
        lineHeight: typography.lineHeight.tight,
        color: WineVisionColors.carbon.base,
        ...fonts.brand,
      },
      h3: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.semibold as any,
        lineHeight: typography.lineHeight.snug,
        color: WineVisionColors.carbon[80],
        ...fonts.primary,
      },
      h4: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium as any,
        lineHeight: typography.lineHeight.snug,
        color: WineVisionColors.carbon[80],
        ...fonts.primary,
      },
      body: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.normal as any,
        lineHeight: typography.lineHeight.normal,
        color: WineVisionColors.carbon[80],
        ...fonts.primary,
      },
      bodySmall: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.normal as any,
        lineHeight: typography.lineHeight.normal,
        color: WineVisionColors.carbon[70],
        ...fonts.primary,
      },
      caption: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.normal as any,
        lineHeight: typography.lineHeight.normal,
        color: WineVisionColors.carbon[50],
        ...fonts.primary,
      },
    },
    
    // Component styles
    components: {
      primaryButton: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold as any,
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[3],
        borderRadius: borderRadius.lg,
        backgroundColor: WineVisionColors.velvet.base,
        color: WineVisionColors.white,
        ...fonts.primary,
        ...shadows.base,
      },
      secondaryButton: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium as any,
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[3],
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        backgroundColor: WineVisionColors.white,
        borderColor: WineVisionColors.carbon[20],
        color: WineVisionColors.carbon.base,
        ...fonts.primary,
      },
      card: {
        borderRadius: borderRadius.xl,
        padding: spacing[5],
        borderWidth: 1,
        backgroundColor: WineVisionColors.white,
        borderColor: WineVisionColors.carbon[10],
        ...shadows.base,
      },
      input: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.normal as any,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        backgroundColor: WineVisionColors.white,
        borderColor: WineVisionColors.carbon[20],
        color: WineVisionColors.carbon.base,
        ...fonts.primary,
      },
    },
  },
};

// Legacy compatibility object for existing code
export const colors = {
  // Carbon
  c: WineVisionColors.carbon.base,
  c_95: WineVisionColors.carbon[95],
  c_90: WineVisionColors.carbon[90],
  c_80: WineVisionColors.carbon[80],
  c_70: WineVisionColors.carbon[70],
  c_50: WineVisionColors.carbon[50],
  c_20: WineVisionColors.carbon[20],
  c_10: WineVisionColors.carbon[10],
  c_5: WineVisionColors.carbon[5],
  c_3: WineVisionColors.carbon[3],
  
  // Velvet
  v: WineVisionColors.velvet.base,
  v_dark: WineVisionColors.velvet.dark,
  v_80: WineVisionColors.velvet[80],
  v_70: WineVisionColors.velvet[70],
  v_50: WineVisionColors.velvet[50],
  v_20: WineVisionColors.velvet[20],
  v_10: WineVisionColors.velvet[10],
  
  // Others
  w: WineVisionColors.white,
  g: WineVisionColors.green,
  g_15: WineVisionColors.green15,
  h: WineVisionColors.hot,
  h_10: WineVisionColors.hot10,
  y: WineVisionColors.yellow,
  y_10: WineVisionColors.yellow10,
  b: WineVisionColors.blue,
  b_10: WineVisionColors.blue10,
};

// Export individual pieces for flexibility
export { WineVisionColors, fonts, spacing, typography, borderRadius, shadows };

// Default export
export default theme;
