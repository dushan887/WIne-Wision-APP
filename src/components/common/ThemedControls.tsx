import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ProfileTheme, getThemedSelectionStyle, getThemedTextColor } from '../../utils/profileTheming';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface ThemedCheckboxProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  profileTheme: ProfileTheme;
}

export const ThemedCheckbox: React.FC<ThemedCheckboxProps> = ({ 
  label, 
  isSelected, 
  onToggle, 
  profileTheme 
}) => {
  const selectionStyle = getThemedSelectionStyle(isSelected, profileTheme);
  const textStyle = getThemedTextColor(isSelected, profileTheme);

  return (
    <TouchableOpacity
      style={[
        tw`mb-3 p-4 rounded-lg flex-row items-center`,
        selectionStyle
      ]}
      onPress={onToggle}
    >
      {/* Checkbox Square */}
      <View style={[
        tw`w-6 h-6 mr-3 items-center justify-center rounded`,
        { 
          backgroundColor: isSelected ? profileTheme.selectionColors.primary : 'transparent',
          borderWidth: 2,
          borderColor: profileTheme.selectionColors.primary
        }
      ]}>
        {isSelected && (
          <Text style={[
            tw`text-xs`,
            { fontFamily: 'Wine-Vision', color: colors.w }
          ]}>&#xe949;</Text>
        )}
      </View>
      
      {/* Label */}
      <Text style={[
        tw`text-base flex-1`,
        { 
          color: textStyle.color,
          fontWeight: textStyle.fontWeight
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface ThemedRadioProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  profileTheme: ProfileTheme;
}

export const ThemedRadio: React.FC<ThemedRadioProps> = ({ 
  label, 
  isSelected, 
  onSelect, 
  profileTheme 
}) => {
  const selectionStyle = getThemedSelectionStyle(isSelected, profileTheme);
  const textStyle = getThemedTextColor(isSelected, profileTheme);

  return (
    <TouchableOpacity
      style={[
        tw`mb-3 p-4 rounded-lg flex-row items-center`,
        selectionStyle
      ]}
      onPress={onSelect}
    >
      {/* Radio Circle */}
      <View style={[
        tw`w-6 h-6 rounded-full mr-3 items-center justify-center`,
        { 
          backgroundColor: isSelected ? profileTheme.selectionColors.primary : 'transparent',
          borderWidth: 2,
          borderColor: profileTheme.selectionColors.primary
        }
      ]}>
        {isSelected && (
          <View style={[
            tw`w-2 h-2 rounded-full`,
            { backgroundColor: colors.w }
          ]} />
        )}
      </View>
      
      {/* Label */}
      <Text style={[
        tw`text-base`,
        { 
          color: textStyle.color,
          fontWeight: textStyle.fontWeight
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
