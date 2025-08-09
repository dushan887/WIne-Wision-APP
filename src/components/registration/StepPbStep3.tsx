import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep3Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-pb-step-3' (Reasons for Visiting)
const StepPbStep3: React.FC<StepPbStep3Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>(
    savedData?.wv_reasonsForVisiting || []
  );
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const reasonsOptions = [
    'Creating new business opportunities',
    'Acquiring new suppliers',
    'Expanding professional network',
    'Exploring Balkan market',
    'Tasting Balkan wines, spirits and food',
    'Attending wine masterclasses',
    'Attending food masterclasses',
    'Tasting awarded wines',
    'Tasting awarded spirits',
    'Attending chef competition',
    'Attending hospitality presentations',
    'Last year\'s fair level of quality',
    'High recommendations about the fair',
    'Experiencing good entertainment',
    'Experiencing Belgrade nightlife',
    'None of the Above'
  ];

  const handleReasonToggle = (reason: string) => {
    let updatedReasons;
    
    if (selectedReasons.includes(reason)) {
      // Remove the reason
      updatedReasons = selectedReasons.filter(r => r !== reason);
    } else {
      // Add the reason
      updatedReasons = [...selectedReasons, reason];
    }
    
    setSelectedReasons(updatedReasons);
    onUpdateData?.({ wv_reasonsForVisiting: updatedReasons });
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

  const renderCheckboxItem = (reason: string) => {
    const isSelected = selectedReasons.includes(reason);
    
    return (
      <TouchableOpacity
        key={reason}
        style={tw`mb-3`}
        onPress={() => handleReasonToggle(reason)}
      >
        <View style={tw`flex-row items-center`}>
          {/* Checkbox */}
          <View style={[
            tw`w-6 h-6 rounded mr-3 items-center justify-start border-2 pt-0.5`,
            {
              backgroundColor: colors.c_20,
              borderColor: colors.c_20
            }
          ]}>
            {isSelected && (
              <Text style={[
                tw`text-lg`,
                { fontFamily: 'Wine-Vision', color: colors.c, lineHeight: 18 }
              ]}>&#xe94b;</Text>
            )}
          </View>
          
          {/* Label */}
          <Text style={[
            tw`text-base flex-1`,
            { 
              color: colors.c
            }
          ]}>
            {reason}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || ''} 
        subtitle={headerSubtitle || ''} 
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
            What are your reasons for participating?
          </Text>
        </View>
        
        {/* Checkbox Container */}
        <View style={[
          tw`rounded-b-lg p-6`,
          { backgroundColor: colors.w, minHeight: 350 }
        ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {reasonsOptions.map(reason => renderCheckboxItem(reason))}
          </ScrollView>
          
          {/* Selection Counter */}
          <View style={tw`mt-4 pt-4 border-t border-gray-200`}>
            <Text style={[
              tw`text-xs text-center`,
              { color: colors.c_50 }
            ]}>
              {selectedReasons.length} reason{selectedReasons.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepPbStep3;
