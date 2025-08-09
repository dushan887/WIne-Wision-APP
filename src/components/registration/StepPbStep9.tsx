import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep9Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
  profile?: 'Exhibitor' | 'Buyer' | 'Visitor' | null;
}

interface FormData {
  wv_socInstagram: string;
  wv_socLinkedin: string;
  wv_socFacebook: string;
  wv_socX: string;
}

const StepPbStep9: React.FC<StepPbStep9Props> = ({ 
  savedData, 
  onUpdateData, 
  onNext,
  headerTitle,
  headerSubtitle,
  profile = 'Buyer'
}) => {
  const [formData, setFormData] = useState<FormData>({
    wv_socInstagram: savedData?.wv_socInstagram || '',
    wv_socLinkedin: savedData?.wv_socLinkedin || '',
    wv_socFacebook: savedData?.wv_socFacebook || '',
    wv_socX: savedData?.wv_socX || ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdateData?.(updatedData);
  };

  const renderInputField = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    required: boolean = false,
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'url' | 'numeric' = 'default'
  ) => (
    <View style={tw`mb-4`}>
      <Text style={[tw`text-base font-normal mb-2`, { color: colors.c }]}>
        {label}{required && '*'}
      </Text>
      <TextInput
        style={[
          tw`rounded-lg px-4 py-3 text-base h-12`,
          { 
            backgroundColor: colors.w, 
            color: colors.c, 
            textAlignVertical: 'center',
            lineHeight: 20
          }
        ]}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={colors.c_50}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' || keyboardType === 'url' ? 'none' : 'words'}
      />
    </View>
  );

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || 'Your social networks'} 
        subtitle={headerSubtitle || 'ALL FIELDS ARE OPTIONAL'} 
      />
      
      {/* Form Fields */}
      <ScrollView style={tw`mt-0`} showsVerticalScrollIndicator={false}>
        {renderInputField(
          'Instagram',
          'wv_socInstagram',
          'Enter Instagram profile URL',
          false,
          'url'
        )}
        
        {renderInputField(
          'LinkedIn',
          'wv_socLinkedin',
          'Enter LinkedIn profile URL',
          false,
          'url'
        )}

        {renderInputField(
          'Facebook',
          'wv_socFacebook',
          'Enter Facebook profile URL',
          false,
          'url'
        )}

        {renderInputField(
          'X (ex Twitter)',
          'wv_socX',
          'Enter X profile URL',
          false,
          'url'
        )}
      </ScrollView>
    </View>
  );
};

export default StepPbStep9;
