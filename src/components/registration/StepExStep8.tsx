import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep8Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
  profile?: string;
}

interface FormData {
  wv_company_idRegistryNumber: string;
  wv_company_vatRegistryNumber: string;
  wv_company_iban: string;
  wv_company_foreignBank: string;
  wv_company_domesticBank: string;
  wv_company_foreignAccountNumber: string;
  wv_company_domesticAccountNumber: string;
  wv_company_foreignSwift: string;
  wv_company_domesticSwift: string;
}

const StepExStep8: React.FC<StepExStep8Props> = ({ 
  savedData, 
  onUpdateData, 
  onNext,
  headerTitle,
  headerSubtitle,
  profile = 'Exhibitor'
}) => {
  const [formData, setFormData] = useState<FormData>({
    wv_company_idRegistryNumber: savedData?.wv_company_idRegistryNumber || '',
    wv_company_vatRegistryNumber: savedData?.wv_company_vatRegistryNumber || '',
    wv_company_iban: savedData?.wv_company_iban || '',
    wv_company_foreignBank: savedData?.wv_company_foreignBank || '',
    wv_company_domesticBank: savedData?.wv_company_domesticBank || '',
    wv_company_foreignAccountNumber: savedData?.wv_company_foreignAccountNumber || '',
    wv_company_domesticAccountNumber: savedData?.wv_company_domesticAccountNumber || '',
    wv_company_foreignSwift: savedData?.wv_company_foreignSwift || '',
    wv_company_domesticSwift: savedData?.wv_company_domesticSwift || ''
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
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' || keyboardType === 'url' ? 'none' : 'words'}
      />
    </View>
  );

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || ''} 
        subtitle={headerSubtitle || ''} 
      />
      
      {/* Form Fields */}
      <ScrollView style={tw`mt-0`} showsVerticalScrollIndicator={false}>
        {renderInputField(
          'ID registry number',
          'wv_company_idRegistryNumber',
          '',
          false
        )}
        
        {renderInputField(
          'VAT registry number',
          'wv_company_vatRegistryNumber',
          '',
          true
        )}

        {renderInputField(
          'IBAN',
          'wv_company_iban',
          '',
          false
        )}

        {renderInputField(
          'Foreign exchange correspondent bank',
          'wv_company_foreignBank',
          '',
          false
        )}

        {renderInputField(
          'Domestic exchange bank',
          'wv_company_domesticBank',
          '',
          false
        )}

        {renderInputField(
          'Foreign exchange account number',
          'wv_company_foreignAccountNumber',
          '',
          false
        )}

        {renderInputField(
          'Domestic exchange account number',
          'wv_company_domesticAccountNumber',
          '',
          false
        )}

        {renderInputField(
          'Foreign exchange swift code',
          'wv_company_foreignSwift',
          '',
          false
        )}

        {renderInputField(
          'Beneficiary swift code',
          'wv_company_domesticSwift',
          '',
          false
        )}
      </ScrollView>
    </View>
  );
};

export default StepExStep8;
