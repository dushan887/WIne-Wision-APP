import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = React.memo(({
  children,
  onPress,
  variant = 'default',
}) => {
  // Memoize card styles for better performance
  const cardStyles = useMemo(() => {
    const baseStyles = 'bg-white rounded-lg p-4 m-2';
    
    const variantStyles = {
      default: 'shadow-sm',
      elevated: 'shadow-lg elevation-5',
      outlined: 'border border-gray-200',
    };

    return `${baseStyles} ${variantStyles[variant]}`;
  }, [variant]);

  if (onPress) {
    return (
      <TouchableOpacity
        style={tw`${cardStyles}`}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={tw`${cardStyles}`}>
      {children}
    </View>
  );
});
