import React from 'react';
import { View, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { WineVisionColors } from '../../utils/wineVisionDesign';

interface WineVisionCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'dark' | 'light';
}

export const WineVisionCard = React.memo<WineVisionCardProps>(({ 
  children, 
  style, 
  variant = 'default' 
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'dark':
        return tw`bg-${WineVisionColors.carbon.primary} p-4 rounded-lg`;
      case 'light':
        return tw`bg-${WineVisionColors.carbon.light} p-4 rounded-lg`;
      default:
        return tw`bg-${WineVisionColors.carbon.light} p-4 rounded-lg`;
    }
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
});

export default WineVisionCard;
