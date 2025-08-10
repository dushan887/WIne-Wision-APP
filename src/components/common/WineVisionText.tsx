import React from 'react';
import { Text, TextStyle } from 'react-native';
import tw from 'twrnc';
import { WineVisionColors } from '../../utils/wineVisionDesign';

interface WineVisionTextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'body' | 'caption' | 'muted';
  style?: TextStyle;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export const WineVisionText = React.memo<WineVisionTextProps>(({ 
  children, 
  variant = 'body',
  size = 'base',
  style 
}) => {
  const getTextStyle = () => {
    let baseStyle = '';
    
    // Size
    switch (size) {
      case 'xs':
        baseStyle += 'text-xs ';
        break;
      case 'sm':
        baseStyle += 'text-sm ';
        break;
      case 'lg':
        baseStyle += 'text-lg ';
        break;
      case 'xl':
        baseStyle += 'text-xl ';
        break;
      case '2xl':
        baseStyle += 'text-2xl ';
        break;
      default:
        baseStyle += 'text-base ';
    }

    // Font family
    baseStyle += 'font-inter-tight ';

    // Variant colors and weights
    switch (variant) {
      case 'heading':
        baseStyle += `text-white font-bold`;
        break;
      case 'body':
        baseStyle += `text-white`;
        break;
      case 'caption':
        baseStyle += `text-${WineVisionColors.carbon.muted}`;
        break;
      case 'muted':
        baseStyle += `text-${WineVisionColors.carbon.muted}`;
        break;
      default:
        baseStyle += `text-white`;
    }

    return tw`${baseStyle}`;
  };

  return (
    <Text style={[getTextStyle(), style]}>
      {children}
    </Text>
  );
});

export default WineVisionText;
