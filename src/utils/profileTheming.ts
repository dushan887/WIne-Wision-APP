const { theme: { extend: { colors } } } = require('../../tailwind.config.js');

export interface ProfileTheme {
  titleParts: { base: string; profile: string | null };
  gradientColors: string[];
  backgroundImage: any;
  selectionColors: {
    primary: string;
    light: string;
    border: string;
  };
  selectionBackgroundImage?: any; // Add background image for selected states
  useImageForSelection?: boolean; // Flag to control color vs image
}

export const getProfileTheme = (profile: 'Exhibitor' | 'Buyer' | 'Visitor' | null): ProfileTheme => {
  switch (profile) {
    case 'Exhibitor':
      return {
        titleParts: { base: 'REGISTER ACCOUNT', profile: 'Exhibitor' },
        gradientColors: [colors.v_dark, colors.v],
        backgroundImage: require('../../assets/images/MOB_Exhibitor_Form_Bck.jpg'),
        selectionColors: {
          primary: colors.v,
          light: colors.v,
          border: colors.v_20
        },
        selectionBackgroundImage: require('../../assets/images/MOB_Exhibitor_MODEL_BTN.jpg'),
        useImageForSelection: true
      };
    case 'Buyer':
      return {
        titleParts: { base: 'REGISTER ACCOUNT', profile: 'Professional Buyer' },
        gradientColors: [colors.t, colors.y],
        backgroundImage: require('../../assets/images/MOB_Buyer_Form_Bck.jpg'),
        selectionColors: {
          primary: colors.y,
          light: colors.y,
          border: colors.y_20
        },
        selectionBackgroundImage: require('../../assets/images/MOB_Buyer_PROFILE_BTN.jpg'),
        useImageForSelection: true
      };
    case 'Visitor':
      return {
        titleParts: { base: 'REGISTER ACCOUNT', profile: 'Visitor' },
        gradientColors: [colors.r_dark, colors.r],
        backgroundImage: require('../../assets/images/MOB_Visitor_Form_Bck.jpg'),
        selectionColors: {
          primary: colors.r,
          light: colors.r,
          border: colors.r_50
        },
        selectionBackgroundImage: require('../../assets/images/MOB_Visitor_MODEL_BTN.jpg'),
        useImageForSelection: true
      };
    default:
      return {
        titleParts: { base: 'REGISTER ACCOUNT', profile: null },
        gradientColors: [colors.c, colors.c_90],
        backgroundImage: require('../../assets/images/MOB_REGISTER_Form_Bck.jpg'),
        selectionColors: {
          primary: colors.g,
          light: colors.g_15,
          border: colors.g_30
        },
        useImageForSelection: false // Default uses colors
      };
  }
};

// Utility function for creating themed checkbox/radio button styles
export const getThemedSelectionStyle = (isSelected: boolean, theme: ProfileTheme) => ({
  backgroundColor: isSelected ? theme.selectionColors.light : colors.c_5,
  borderColor: isSelected ? theme.selectionColors.primary : colors.c_20,
  borderWidth: 2,
});

// Utility function for themed text colors
export const getThemedTextColor = (isSelected: boolean, theme: ProfileTheme) => ({
  color: isSelected ? colors.w : colors.c,
  fontWeight: isSelected ? '700' : '500' as '700' | '500',
});

// Utility function for themed icon colors
export const getThemedIconColor = (isSelected: boolean, theme: ProfileTheme) => ({
  color: isSelected ? theme.selectionColors.primary : colors.c_20,
});
