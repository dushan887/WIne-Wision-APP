/**
 * Wine Vision Design System Utilities
 * 
 * This file provides utility functions and examples for using the Wine Vision
 * color palette, fonts, and design system in React Native components.
 */

import tw from 'twrnc';

// Wine Vision Color Categories
export const WineVisionColors = {
  // Carbon (Dark theme base)
  carbon: {
    primary: 'c',           // rgb(11,5,28) - Darkest
    lighter: 'c_95',        // rgb(23,18,39)
    light: 'c_90',          // rgb(35,30,51)
    medium: 'c_80',         // rgb(60,55,73)
    muted: 'c_50',          // rgb(133,130,142)
    pale: 'c_20',           // rgb(206,205,210)
    minimal: 'c_10',        // rgb(231,230,232)
  },

  // Velvet (Exhibitors - Purple)
  velvet: {
    dark: 'v_dark',         // rgb(50,10,100)
    primary: 'v',           // rgb(110,15,215)
    medium: 'v_80',         // rgb(139,63,223)
    light: 'v_70',          // rgb(154,87,227)
    pale: 'v_20',           // rgb(226,207,247)
    minimal: 'v_10',        // rgb(241,231,251)
  },

  // Ultramarine (Upcoming Meetings - Blue)
  ultramarine: {
    primary: 'u',           // rgb(40,70,190)
    light: 'u_85',          // rgb(72,98,200)
    medium: 'u_60',         // rgb(126,144,216)
    pale: 'u_40',           // rgb(169,181,229)
    minimal: 'u_20',        // rgb(212,218,242)
  },

  // Status Colors
  status: {
    success: 'g',           // rgb(0,200,100) - Green
    info: 'b',              // rgb(0,135,255) - Blue
    warning: 'y',           // rgb(250,165,0) - Yellow
    error: 'r',             // rgb(235,0,55) - Red
    danger: 'h',            // rgb(255,20,40) - Hot
  },

  // Role Colors
  roles: {
    visitor: 'r',           // Red gradient
    exhibitor: 'v',         // Velvet gradient
    buyer: 'y',             // Yellow/Terracotta gradient
  },

  // Product Colors
  wine: {
    white: 'wine-white',    // rgb(200,160,120)
    rose: 'wine-rose',      // rgb(255,140,170)
    orange: 'wine-orange',  // rgb(250,110,60)
    red: 'wine-red',        // rgb(220,20,60)
    sparkling: 'wine-sparkling', // rgb(145,150,170)
  },

  spirits: {
    plum: 'plum',           // rgb(110,85,200)
    quince: 'quince',       // rgb(200,150,20)
    pear: 'pear',           // rgb(180,180,90)
    grape: 'grape',         // rgb(140,190,140)
  }
};

// Wine Vision Font Utilities
export const WineVisionFonts = {
  primary: 'font-primary',
  primaryItalic: 'font-primary-italic',
  icons: 'font-brand',
  fallback: 'font-sans',
};

// Common Style Combinations - Using CSS-in-JS for colors
export const WineVisionStyles = {
  // Headers
  h1: [tw`text-32 font-primary font-700 leading-1-2`, { color: 'rgb(11,5,28)' }],
  h2: [tw`text-24 font-primary font-600 leading-1-25`, { color: 'rgb(11,5,28)' }],
  h3: [tw`text-20 font-primary font-600 leading-1-3`, { color: 'rgb(60,55,73)' }],
  h4: [tw`text-18 font-primary font-500 leading-1-3`, { color: 'rgb(60,55,73)' }],

  // Body Text
  body: [tw`text-16 font-primary font-400 leading-1-5`, { color: 'rgb(60,55,73)' }],
  bodySmall: [tw`text-14 font-primary font-400 leading-1-4`, { color: 'rgb(84,80,96)' }],
  caption: [tw`text-12 font-primary font-400 leading-1-3`, { color: 'rgb(133,130,142)' }],

  // Buttons
  primaryButton: [tw`font-primary font-600 text-16 px-24 py-12 rounded-8`, { backgroundColor: 'rgb(110,15,215)', color: 'rgb(255,255,255)' }],
  secondaryButton: [tw`font-primary font-500 text-16 px-24 py-12 rounded-8 border-1`, { backgroundColor: 'rgb(231,230,232)', color: 'rgb(11,5,28)', borderColor: 'rgb(206,205,210)' }],
  
  // Cards
  card: [tw`rounded-12 p-20 shadow-lg border-1`, { backgroundColor: 'rgb(255,255,255)', borderColor: 'rgb(231,230,232)' }],
  cardHeader: [tw`text-18 font-primary font-600 mb-12`, { color: 'rgb(11,5,28)' }],
  
  // Status Badges
  successBadge: [tw`px-12 py-4 rounded-16 font-primary font-500 text-14`, { backgroundColor: 'rgb(217,247,232)', color: 'rgb(0,200,100)' }],
  errorBadge: [tw`px-12 py-4 rounded-16 font-primary font-500 text-14`, { backgroundColor: 'rgb(255,232,234)', color: 'rgb(255,20,40)' }],
  warningBadge: [tw`px-12 py-4 rounded-16 font-primary font-500 text-14`, { backgroundColor: 'rgb(255,246,230)', color: 'rgb(250,165,0)' }],
  infoBadge: [tw`px-12 py-4 rounded-16 font-primary font-500 text-14`, { backgroundColor: 'rgb(230,243,255)', color: 'rgb(0,135,255)' }],

  // Gradients (use with backgroundImage)
  carbonGradient: 'bg-carbon-gradient-up',
  velvetGradient: 'bg-exhibitor-gradient-light',
  visitorGradient: 'bg-visitor-gradient',
  buyerGradient: 'bg-buyer-gradient',
  headerGradient: 'bg-header-gradient',
  wineVisionGradient: 'bg-wv-gradient',
};

// Utility Functions
export const getColorByRole = (role: 'visitor' | 'exhibitor' | 'buyer'): string => {
  switch (role) {
    case 'visitor': return WineVisionColors.roles.visitor;
    case 'exhibitor': return WineVisionColors.roles.exhibitor;
    case 'buyer': return WineVisionColors.roles.buyer;
    default: return WineVisionColors.carbon.medium;
  }
};

export const getStatusColor = (status: 'success' | 'error' | 'warning' | 'info'): string => {
  return WineVisionColors.status[status] || WineVisionColors.carbon.medium;
};

// Screen Size Responsive Utilities
export const responsive = {
  text: (baseSize: number) => ({
    fontSize: `${baseSize}px`,
    // Add scaling logic based on screen size if needed
  }),
  spacing: (basePx: number) => `${basePx}px`,
  percentage: (percent: number) => `${percent}%`,
};

// Icon Utilities (for Wine Vision icon font)
export const WineVisionIcons = {
  // Navigation & Actions
  separator: '\ue930',        // Wine Vision separator icon
  arrowLeft: '\ue94e',        // Arrow pointing left (outline)
  arrowRight: '\ue94f',       // Arrow pointing right (filled)
  loading: '\ue91a',          // Loading/spinner icon
  
  // Form & Input
  eyeOpen: '\ue94c',          // Eye open (show password)
  eyeClosed: '\ue95c',        // Eye closed (hide password)
  
  // Selection & Status
  checkEmpty: '\ue949',       // Empty checkbox/radio (outline)
  checkFilled: '\ue94a',      // Filled checkbox/radio (selected)
  
  // Profile & User
  userProfile: '\ue954',      // User profile icon
  
  // Add more as discovered in the font file
  // Use with: <Text style={{ fontFamily: 'Wine-Vision' }}>{WineVisionIcons.iconName}</Text>
};

export default {
  WineVisionColors,
  WineVisionFonts,
  WineVisionStyles,
  getColorByRole,
  getStatusColor,
  responsive,
  WineVisionIcons,
};
