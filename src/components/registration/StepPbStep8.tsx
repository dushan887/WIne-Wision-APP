import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
import { getProfileTheme } from '../../utils/profileTheming';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep8Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
  profile?: 'Exhibitor' | 'Buyer' | 'Visitor' | null;
}

const StepPbStep8: React.FC<StepPbStep8Props> = ({ 
  savedData, 
  onUpdateData, 
  onNext,
  headerTitle,
  headerSubtitle,
  profile = 'Buyer'
}) => {
  const [reasonForApplying, setReasonForApplying] = useState(savedData?.wv_reasonForApplying || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const maxLength = 300;

  const handleTextChange = (text: string) => {
    // Limit to 300 characters
    const limitedText = text.slice(0, maxLength);
    setReasonForApplying(limitedText);
    onUpdateData?.({ wv_reasonForApplying: limitedText });
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
        title={headerTitle || 'Your reasons for applying'} 
        subtitle={headerSubtitle || 'IN WRITTEN WORDS, UP TO 300 CHARACTERS'} 
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
            Why are you applying for the program?
          </Text>
        </View>
        
        {/* Content Container */}
        <View style={[
          tw`rounded-b-lg p-6`,
          { backgroundColor: colors.w }
        ]}>
          {/* Logo and Info Section */}
          <View style={tw`mb-6`}>
            {/* Logo */}
            <View style={tw`items-center mb-4`}>
              <Image
                source={require('../../../assets/images/Hosted_Buyers_LOGO-1.png')}
                style={tw`w-64 h-16`}
                resizeMode="contain"
              />
            </View>
            
            {/* Info Text */}
            <Text style={[
              tw`text-sm leading-5 mb-4`,
              { color: colors.c }
            ]}>
              The Wine Vision Hosted Buyers Program has been designed to provide financial support to professional buyers. It is structured into four categories, representing different levels of support, each implying different set of obligations. The evaluation of participants applying for the support program is conducted in alternating cycles, each lasting 15 working days. Upon the completion of each cycle, the processed applicants are notified of the evaluation results. In the case of an approved application, the organizer specifies which support category has been assigned. The decision regarding the assigned category is final. In the case of a rejected application, the organizer is not obligated to provide an explanation for the decision.
            </Text>
          </View>

          {/* Textarea */}
          <TextInput
            style={[
              tw`text-base leading-6 border border-gray-200 rounded-lg p-4`,
              { 
                color: colors.c,
                textAlignVertical: 'top',
                minHeight: 150,
                backgroundColor: colors.c_5
              }
            ]}
            value={reasonForApplying}
            onChangeText={handleTextChange}
            placeholder="Enter your reasons for applying..."
            placeholderTextColor={colors.c_50}
            multiline={true}
            numberOfLines={6}
            maxLength={maxLength}
          />
          
          {/* Character Counter */}
          <View style={tw`mt-4 flex-row justify-end`}>
            <Text style={[
              tw`text-xs`,
              { color: reasonForApplying.length >= maxLength ? colors.r : colors.c_50 }
            ]}>
              {reasonForApplying.length}/{maxLength} characters
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepPbStep8;
