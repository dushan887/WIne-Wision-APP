/**
 * Wine Vision Colors - Direct Style Objects
 * No more Tailwind utility warnings - use these instead
 */

// Direct color values for immediate use
export const WineVisionColorValues = {
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
  white: 'rgb(255,255,255)',
  green: 'rgb(0,200,100)',
  green15: 'rgb(217,247,232)',
  hot: 'rgb(255,20,40)',
  hot10: 'rgb(255,232,234)',
  yellow: 'rgb(250,165,0)',
  yellow10: 'rgb(255,246,230)',
  blue: 'rgb(0,135,255)',
  blue10: 'rgb(230,243,255)',
};

// Ready-to-use style objects
export const WVColors = {
  // Text styles
  text: {
    carbon: { color: WineVisionColorValues.carbon.base },
    carbon80: { color: WineVisionColorValues.carbon[80] },
    carbon70: { color: WineVisionColorValues.carbon[70] },
    carbon50: { color: WineVisionColorValues.carbon[50] },
    carbon20: { color: WineVisionColorValues.carbon[20] },
    velvet: { color: WineVisionColorValues.velvet.base },
    white: { color: WineVisionColorValues.white },
    green: { color: WineVisionColorValues.green },
    hot: { color: WineVisionColorValues.hot },
    yellow: { color: WineVisionColorValues.yellow },
    blue: { color: WineVisionColorValues.blue },
  },
  
  // Background styles
  bg: {
    carbon: { backgroundColor: WineVisionColorValues.carbon.base },
    carbon95: { backgroundColor: WineVisionColorValues.carbon[95] },
    carbon90: { backgroundColor: WineVisionColorValues.carbon[90] },
    carbon80: { backgroundColor: WineVisionColorValues.carbon[80] },
    carbon20: { backgroundColor: WineVisionColorValues.carbon[20] },
    carbon10: { backgroundColor: WineVisionColorValues.carbon[10] },
    carbon5: { backgroundColor: WineVisionColorValues.carbon[5] },
    velvet: { backgroundColor: WineVisionColorValues.velvet.base },
    velvet10: { backgroundColor: WineVisionColorValues.velvet[10] },
    white: { backgroundColor: WineVisionColorValues.white },
    green: { backgroundColor: WineVisionColorValues.green },
    green15: { backgroundColor: WineVisionColorValues.green15 },
    hot10: { backgroundColor: WineVisionColorValues.hot10 },
    yellow10: { backgroundColor: WineVisionColorValues.yellow10 },
    blue10: { backgroundColor: WineVisionColorValues.blue10 },
  },
  
  // Border styles  
  border: {
    carbon: { borderColor: WineVisionColorValues.carbon.base },
    carbon20: { borderColor: WineVisionColorValues.carbon[20] },
    carbon10: { borderColor: WineVisionColorValues.carbon[10] },
    velvet: { borderColor: WineVisionColorValues.velvet.base },
    velvet20: { borderColor: WineVisionColorValues.velvet[20] },
    hot: { borderColor: WineVisionColorValues.hot },
  },
};

// Font families
export const WVFonts = {
  primary: { fontFamily: 'InterTight-VariableFont_wght' },
  primaryItalic: { fontFamily: 'InterTight-Italic-VariableFont_wght' },
  brand: { fontFamily: 'Wine-Vision' },
};

// Combined common styles - NO MORE TAILWIND COLOR WARNINGS!
export const WVStyles = {
  // Typography
  h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 38.4, ...WVFonts.primary, ...WVColors.text.carbon },
  h2: { fontSize: 24, fontWeight: '600' as const, lineHeight: 30, ...WVFonts.primary, ...WVColors.text.carbon },
  h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 26, ...WVFonts.primary, ...WVColors.text.carbon80 },
  h4: { fontSize: 18, fontWeight: '500' as const, lineHeight: 23.4, ...WVFonts.primary, ...WVColors.text.carbon80 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24, ...WVFonts.primary, ...WVColors.text.carbon80 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 19.6, ...WVFonts.primary, ...WVColors.text.carbon70 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 15.6, ...WVFonts.primary, ...WVColors.text.carbon50 },
  
  // Buttons
  primaryButton: {
    fontSize: 16, 
    fontWeight: '600' as const, 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    borderRadius: 8,
    ...WVFonts.primary,
    ...WVColors.bg.velvet,
    ...WVColors.text.white
  },
  secondaryButton: {
    fontSize: 16, 
    fontWeight: '500' as const, 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    borderRadius: 8, 
    borderWidth: 1,
    ...WVFonts.primary,
    ...WVColors.bg.carbon10,
    ...WVColors.text.carbon,
    ...WVColors.border.carbon20
  },
  
  // Status badges
  successBadge: {
    fontSize: 14, 
    fontWeight: '500' as const, 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 16,
    ...WVFonts.primary,
    ...WVColors.bg.green15,
    ...WVColors.text.green
  },
  errorBadge: {
    fontSize: 14, 
    fontWeight: '500' as const, 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 16,
    ...WVFonts.primary,
    ...WVColors.bg.hot10,
    ...WVColors.text.hot
  },
  
  // Cards
  card: {
    borderRadius: 12, 
    padding: 20, 
    borderWidth: 1,
    ...WVColors.bg.white,
    ...WVColors.border.carbon10
  },
};

// Legacy color object for compatibility (matches existing usage)
export const colors = {
  c: WineVisionColorValues.carbon.base,
  c_95: WineVisionColorValues.carbon[95],
  c_90: WineVisionColorValues.carbon[90],
  c_80: WineVisionColorValues.carbon[80],
  c_70: WineVisionColorValues.carbon[70],
  c_50: WineVisionColorValues.carbon[50],
  c_20: WineVisionColorValues.carbon[20],
  c_10: WineVisionColorValues.carbon[10],
  c_5: WineVisionColorValues.carbon[5],
  
  v: WineVisionColorValues.velvet.base,
  v_dark: WineVisionColorValues.velvet.dark,
  v_80: WineVisionColorValues.velvet[80],
  v_70: WineVisionColorValues.velvet[70],
  v_50: WineVisionColorValues.velvet[50],
  v_20: WineVisionColorValues.velvet[20],
  v_10: WineVisionColorValues.velvet[10],
  
  w: WineVisionColorValues.white,
  g: WineVisionColorValues.green,
  g_15: WineVisionColorValues.green15,
  h: WineVisionColorValues.hot,
  h_10: WineVisionColorValues.hot10,
  y: WineVisionColorValues.yellow,
  y_10: WineVisionColorValues.yellow10,
  b: WineVisionColorValues.blue,
  b_10: WineVisionColorValues.blue10,
};
