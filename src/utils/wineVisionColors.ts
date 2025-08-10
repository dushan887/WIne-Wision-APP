/**
 * Wine Vision Color Utilities
 * Safe color utilities that work with twrnc without warnings
 */

// Wine Vision Color Palette
export const WineVisionColorPalette = {
  // Carbon
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
  
  // Velvet (Exhibitors)
  velvet: {
    dark: 'rgb(50,10,100)',
    base: 'rgb(110,15,215)',
    80: 'rgb(139,63,223)',
    70: 'rgb(154,87,227)',
    50: 'rgb(183,135,235)',
    20: 'rgb(226,207,247)',
    10: 'rgb(241,231,251)',
  },
  
  // Other colors
  white: 'rgb(255,255,255)',
  green: {
    base: 'rgb(0,200,100)',
    30: 'rgb(179,239,209)',
    15: 'rgb(217,247,232)',
  },
  hot: {
    base: 'rgb(255,20,40)',
    70: 'rgb(255,91,105)',
    50: 'rgb(255,138,147)',
    10: 'rgb(255,232,234)',
  },
  yellow: {
    base: 'rgb(250,165,0)',
    50: 'rgb(253,210,128)',
    20: 'rgb(254,237,204)',
    10: 'rgb(255,246,230)',
  },
  blue: {
    base: 'rgb(0,135,255)',
    70: 'rgb(77,171,255)',
    50: 'rgb(128,195,255)',
    20: 'rgb(204,231,255)',
    10: 'rgb(230,243,255)',
  },
};

// Safe style utilities
export const wvColors = {
  // Text colors
  text: {
    carbon: { color: WineVisionColorPalette.carbon.base },
    carbon80: { color: WineVisionColorPalette.carbon[80] },
    carbon70: { color: WineVisionColorPalette.carbon[70] },
    carbon50: { color: WineVisionColorPalette.carbon[50] },
    velvet: { color: WineVisionColorPalette.velvet.base },
    white: { color: WineVisionColorPalette.white },
    green: { color: WineVisionColorPalette.green.base },
    hot: { color: WineVisionColorPalette.hot.base },
    yellow: { color: WineVisionColorPalette.yellow.base },
    blue: { color: WineVisionColorPalette.blue.base },
  },
  
  // Background colors
  bg: {
    carbon: { backgroundColor: WineVisionColorPalette.carbon.base },
    carbon95: { backgroundColor: WineVisionColorPalette.carbon[95] },
    carbon90: { backgroundColor: WineVisionColorPalette.carbon[90] },
    carbon80: { backgroundColor: WineVisionColorPalette.carbon[80] },
    carbon20: { backgroundColor: WineVisionColorPalette.carbon[20] },
    carbon10: { backgroundColor: WineVisionColorPalette.carbon[10] },
    carbon5: { backgroundColor: WineVisionColorPalette.carbon[5] },
    velvet: { backgroundColor: WineVisionColorPalette.velvet.base },
    velvet10: { backgroundColor: WineVisionColorPalette.velvet[10] },
    white: { backgroundColor: WineVisionColorPalette.white },
    green15: { backgroundColor: WineVisionColorPalette.green[15] },
    hot10: { backgroundColor: WineVisionColorPalette.hot[10] },
    yellow10: { backgroundColor: WineVisionColorPalette.yellow[10] },
    blue10: { backgroundColor: WineVisionColorPalette.blue[10] },
  },
};

// Font family utilities
export const wvFonts = {
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

// Usage example:
// Instead of: tw`text-c bg-v font-inter-tight`
// Use: [tw`text-lg font-bold`, wvColors.text.carbon, wvColors.bg.velvet, wvFonts.primary]
