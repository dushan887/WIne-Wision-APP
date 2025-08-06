import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface UnreadBadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({
  count,
  size = 'medium',
  color = 'bg-red-500',
}) => {
  if (count <= 0) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4 text-xs';
      case 'large':
        return 'w-8 h-8 text-base';
      default:
        return 'w-6 h-6 text-sm';
    }
  };

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View
      style={tw`${color} ${getSizeStyles()} rounded-full items-center justify-center absolute -top-2 -right-2`}
    >
      <Text style={tw`text-white font-bold text-center`}>
        {displayCount}
      </Text>
    </View>
  );
};
