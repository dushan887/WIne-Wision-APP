import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { theme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  // Memoize button styles for better performance
  const buttonStyles = useMemo(() => {
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
  }, [variant, size, disabled, loading]);

  const buttonBackgroundStyle = useMemo(() => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: theme.colors.red };
      case 'secondary':
        return { backgroundColor: theme.colors.carbon[70] };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 2, borderColor: theme.colors.red };
      case 'link':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: theme.colors.red };
    }
  }, [variant]);

  const textStyles = useMemo(() => {
    const baseStyles = 'font-semibold';
    
    const sizeStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };

    return `${baseStyles} ${sizeStyles[size]}`;
  }, [size]);

  const textColor = useMemo(() => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return { color: theme.colors.white };
      case 'outline':
        return { color: theme.colors.red };
      case 'link':
        return { color: theme.colors.red };
      default:
        return { color: theme.colors.white };
    }
  }, [variant]);

  const activityIndicatorColor = useMemo(() => 
    variant === 'outline' ? theme.colors.red : theme.colors.white
  , [variant]);

  return (
    <TouchableOpacity
      style={[tw`${buttonStyles}`, buttonBackgroundStyle]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={activityIndicatorColor}
          style={tw`mr-2`}
        />
      ) : null}
      <Text style={[tw`${textStyles}`, textColor]}>{title}</Text>
    </TouchableOpacity>
  );
});
