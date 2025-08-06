import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
}) => {
  const getCardStyles = () => {
    const baseStyles = 'bg-white rounded-lg p-4 m-2';
    
    const variantStyles = {
      default: 'shadow-sm',
      elevated: 'shadow-lg elevation-5',
      outlined: 'border border-gray-200',
    };

    return `${baseStyles} ${variantStyles[variant]}`;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={tw`${getCardStyles()}`}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={tw`${getCardStyles()}`}>
      {children}
    </View>
  );
};
