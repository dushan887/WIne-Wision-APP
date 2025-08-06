const { Dimensions } = require('react-native');
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Custom plugin for rem-like scaling (e.g., 1rem = 16px base, scaled by screen)
function remPlugin({ addUtilities }) {
  const baseFontSize = 16; // Adjust as needed
  const remToPx = (rem) => `${rem * baseFontSize}px`;
  const utilities = {};
  for (let i = 0.5; i <= 10; i += 0.25) {
    utilities[`.text-${i}rem`] = { fontSize: remToPx(i) };
    utilities[`.p-${i}rem`] = { padding: remToPx(i) };
    utilities[`.m-${i}rem`] = { margin: remToPx(i) };
    // Add more (e.g., spacing, borders) as needed
  }
  addUtilities(utilities);
}

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Spacers (px, but scalable via % where needed)
      spacing: {
        0: '0',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        30: '30px',
        32: '32px',
        36: '36px',
        40: '40px',
        48: '48px',
        64: '64px',
        128: '128px',
        // Dynamic % for full scalability (e.g., full-width = '100%')
        'screen-w': `${screenWidth}px`,
        'screen-h': `${screenHeight}px`,
        '10%': '10%',
        '20%': '20%',
        // ... add more % as needed
      },
      // Font sizes (px base, but use rem utilities for scaling)
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        30: '30px',
        32: '32px',
        36: '36px',
        40: '40px',
        48: '48px',
        64: '64px',
        128: '128px',
      },
      // Line-heights (unitless, scales with fontSize)
      lineHeight: {
        1: '1',
        '1-1': '1.1',
        '1-15': '1.15',
        '1-2': '1.2',
        '1-25': '1.25',
        '1-3': '1.3',
        '1-4': '1.4',
        '1-5': '1.5',
        '1-6': '1.6',
        2: '2',
      },
      // Letter-spacing (em, scales with fontSize)
      letterSpacing: {
        0: '0',
        1: '0.025em',
        2: '0.05em',
        3: '0.075em',
        4: '0.1em',
        5: '0.125em',
        6: '0.15em',
        7: '0.175em',
        8: '0.2em',
      },
      // Border widths (px)
      borderWidth: {
        0: '0',
        1: '1px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      // Border radii (px)
      borderRadius: {
        0: '0',
        1: '1px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        36: '36px',
        40: '40px',
        48: '48px',
        64: '64px',
        128: '128px',
        200: '200px',
      },
      // Font weights
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      // Custom colors (full from _main.scss)
      colors: {
        c: 'rgb(11,5,28)',
        c_95: 'rgb(23,18,39)',
        c_90: 'rgb(35,30,51)',
        c_80: 'rgb(60,55,73)',
        c_70: 'rgb(84,80,96)',
        c_50: 'rgb(133,130,142)',
        c_20: 'rgb(206,205,210)',
        c_10: 'rgb(231,230,232)',
        c_5: 'rgb(243,243,244)',
        c_3: 'rgb(248,248,248)',
        v_dark: 'rgb(50,10,100)',
        v: 'rgb(110,15,215)',
        v_80: 'rgb(139,63,223)',
        v_70: 'rgb(154,87,227)',
        v_50: 'rgb(183,135,235)',
        v_20: 'rgb(226,207,247)',
        v_10: 'rgb(241,231,251)',
        e: 'rgb(90,135,165)',
        e_10: 'rgb(239,243,246)',
        u: 'rgb(40,70,190)',
        u_85: 'rgb(72,98,200)',
        u_60: 'rgb(126,144,216)',
        u_40: 'rgb(169,181,229)',
        u_20: 'rgb(212,218,242)',
        g: 'rgb(0,200,100)',
        g_30: 'rgb(179,239,209)',
        g_15: 'rgb(217,247,232)',
        b: 'rgb(0,135,255)',
        b_70: 'rgb(77,171,255)',
        // Add ALL remaining from your full _main.scss (e.g., grape, w_100, etc. – assume you paste the full list here in production)
        // Example continuation:
        grape: 'rgb(140,190,140)',
        w_100: 'rgb(180,110,40)',
        w_80: 'rgb(195,139,83)',
        w_20: 'rgb(240,226,212)',
        f_100: 'rgb(0,160,70)',
        f_80: 'rgb(51,179,107)',
        f_20: 'rgb(204,236,218)',
        s_100: 'rgb(215,65,40)',
        s_80: 'rgb(223,103,83)',
        s_20: 'rgb(247,217,212)',
      },
      // Gradients (backgroundImage)
      backgroundImage: {
        'carbon-gradient-up': 'linear-gradient(rgb(11,5,28), rgb(35,30,51))',
        'carbon-gradient-down': 'linear-gradient(rgb(35,30,51), rgb(11,5,28))',
        'idle-day-gradient': 'linear-gradient(rgb(60,55,73), rgb(35,30,51))',
        'visitor-gradient': 'linear-gradient(rgb(130,0,40), rgb(235,0,55))',
        'exhibitor-gradient-dark': 'linear-gradient(rgb(50,10,100), rgb(110,15,215))',
        'exhibitor-gradient-light': 'linear-gradient(rgb(110,15,215), rgb(154,87,227))',
        'buyer-gradient': 'linear-gradient(rgb(160,100,70), rgb(250,165,0))',
        'header-gradient': 'linear-gradient(rgb(255,255,255), rgb(206,205,210))',
        'wv-gradient': 'linear-gradient(rgb(250,165,0), rgb(235,0,55), rgb(110,15,215))',
        // Add more if in full _main.scss
      },
      // Fonts
      fontFamily: {
        base: ['InterTight-Regular', 'sans-serif'],
        'base-italic': ['InterTight-Italic', 'sans-serif'],
        icons: ['Wine-Vision'],
      },
    },
  },
  plugins: [remPlugin], // From previous snippet; add if not defined
};