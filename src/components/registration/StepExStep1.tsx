import React, { useState } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { ThemedRadio } from '../common/ThemedControls';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep1Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-ex-step-1' (Field of Work)
const StepExStep1: React.FC<StepExStep1Props> = ({ savedData, onUpdateData, headerTitle, headerSubtitle }) => {
  const [selectedField, setSelectedField] = useState(savedData?.fieldOfWork || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const options = [
    { label: 'Wine', value: 'wine' },
    { label: 'Spirits', value: 'spirits' },
    { label: 'Food', value: 'food' },
  ];

  const handleSelect = (value: string) => {
    setSelectedField(value);
    onUpdateData?.({ fieldOfWork: value });
  };

  return (
    <View style={tw`px-6 py-4`}>  
      {/* Header */}
      {headerTitle && headerSubtitle && (
        <StepHeader title={headerTitle} subtitle={headerSubtitle} />
      )}
      
      {/* Themed Radio Buttons */}
      {options.map((option) => {
        const isSelected = selectedField === option.value;
        
        return (
          <ThemedRadio
            key={option.value}
            label={option.label}
            isSelected={isSelected}
            onSelect={() => handleSelect(option.value)}
            profileTheme={profileTheme}
          />
        );
      })}
    </View>
  );
};

export default StepExStep1;
