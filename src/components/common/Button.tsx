import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const getButtonStyles = () => {
    const baseStyles = 'rounded-lg flex-row items-center justify-center';
    
    const sizeStyles = {
      small: 'px-4 py-2',
      medium: 'px-6 py-3',
      large: 'px-8 py-4',
    };

    const variantStyles = {
      primary: 'bg-wine-600',
      secondary: 'bg-gray-600',
      outline: 'border-2 border-wine-600 bg-transparent',
    };

    const disabledStyles = disabled || loading ? 'opacity-50' : '';

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles}`;
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold';
    
    const sizeStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };

    const variantStyles = {
      primary: 'text-white',
      secondary: 'text-white',
      outline: 'text-wine-600',
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
  };

  return (
    <TouchableOpacity
      style={tw`${getButtonStyles()}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? '#7c2d12' : '#ffffff'}
          style={tw`mr-2`}
        />
      ) : null}
      <Text style={tw`${getTextStyles()}`}>{title}</Text>
    </TouchableOpacity>
  );
};
