import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
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

    const disabledStyles = disabled || loading ? 'opacity-50' : '';
    // Link buttons have minimal padding
    if (variant === 'link') return `px-2 py-1 ${disabledStyles}`;

    return `${baseStyles} ${sizeStyles[size]} ${disabledStyles}`;
  };

  const getButtonBackgroundStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors['wine-red'] };
      case 'secondary':
        return { backgroundColor: '#4B5563' }; // gray-600
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors['wine-red'] };
      case 'link':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: colors['wine-red'] };
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold';
    
    const sizeStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };

    return `${baseStyles} ${sizeStyles[size]}`;
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return { color: '#ffffff' };
      case 'outline':
        return { color: colors['wine-red'] };
      default:
        return { color: '#ffffff' };
    }
  };

  return (
    <TouchableOpacity
      style={[tw`${getButtonStyles()}`, getButtonBackgroundStyle()]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors['wine-red'] : '#ffffff'}
          style={tw`mr-2`}
        />
      ) : null}
      <Text style={[tw`${getTextStyles()}`, getTextColor()]}>{title}</Text>
    </TouchableOpacity>
  );
};
