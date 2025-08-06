import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import tw from 'twrnc';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#7c2d12',
  text,
}) => {
  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={tw`mt-4 text-gray-600 text-center`}>{text}</Text>
      )}
    </View>
  );
};
