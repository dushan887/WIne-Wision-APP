import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep4Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-pb-step-4' (Other Reasons for Visiting)
const StepPbStep4: React.FC<StepPbStep4Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [description, setDescription] = useState(savedData?.wv_otherReasonsForVisiting || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const handleTextChange = (text: string) => {
    // Limit to 200 characters
    const limitedText = text.slice(0, 200);
    setDescription(limitedText);
    onUpdateData?.({ wv_otherReasonsForVisiting: limitedText });
  };

  // Get profile-specific background color for the label section
  const getLabelBackgroundColor = () => {
    const profile = savedData?.wv_profileSelection;
    
    switch (profile) {
      case 'Exhibitor':
        return colors.v_dark; // Dark purple
      case 'Buyer':
        return colors.y; // Yellow
      case 'Visitor':
        return colors.r_dark; // Dark red
      default:
        return colors.c; // Default carbon
    }
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || 'Taking part in WVOB25'} 
        subtitle={headerSubtitle || 'PARTICIPATION • IN WRITTEN WORDS, UP TO 200 CHARACTERS'} 
      />
      
      {/* Input Section */}
      <View style={tw`mt-0`}>
        {/* Label */}
        <View style={[
          tw`rounded-t-lg px-8 py-4`,
          { backgroundColor: getLabelBackgroundColor() }
        ]}>
          <Text style={[
            tw`text-center text-sm font-medium`,
            { color: colors.w }
          ]}>
            Specify your reasons for participating
          </Text>
        </View>
        
        {/* Textarea Container */}
        <View style={[
          tw`rounded-b-lg p-8`,
          { backgroundColor: colors.w, minHeight: 350 }
        ]}>
          <TextInput
            style={[
              tw`flex-1 text-base leading-6`,
              { 
                color: colors.c,
                textAlignVertical: 'top',
                minHeight: 200
              }
            ]}
            value={description}
            onChangeText={handleTextChange}
            placeholder="Specify your other reasons for participating..."
            placeholderTextColor={colors.c_50}
            multiline={true}
            numberOfLines={8}
            maxLength={200}
          />
          
          {/* Character Counter */}
          <View style={tw`mt-4 flex-row justify-end`}>
            <Text style={[
              tw`text-xs`,
              { color: description.length >= 200 ? colors.r : colors.c_50 }
            ]}>
              {description.length}/200 characters
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepPbStep4;
