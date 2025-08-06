import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { Button } from './Button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try Again',
}) => {
  return (
    <View style={tw`flex-1 justify-center items-center p-6`}>
      <Text style={tw`text-xl font-bold text-red-600 mb-2 text-center`}>
        {title}
      </Text>
      <Text style={tw`text-gray-600 text-center mb-6`}>
        {message}
      </Text>
      {onRetry && (
        <Button
          title={retryText}
          onPress={onRetry}
          variant="outline"
        />
      )}
    </View>
  );
};
