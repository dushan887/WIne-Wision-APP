import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
import { COUNTRIES } from '../../utils';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepVsStep3Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

interface FormData {
  wv_firstName: string;
  wv_lastName: string;
  wv_professionalOccupation: string;
  wv_company_country: string;
  wv_company_city: string;
  wv_email: string;
}

const StepVsStep3: React.FC<StepVsStep3Props> = ({ 
  savedData, 
  onUpdateData, 
  onNext,
  headerTitle,
  headerSubtitle
}) => {
  const [formData, setFormData] = useState<FormData>({
    wv_firstName: savedData?.wv_firstName || '',
    wv_lastName: savedData?.wv_lastName || '',
    wv_professionalOccupation: savedData?.wv_professionalOccupation || '',
    wv_company_country: savedData?.wv_company_country || '',
    wv_company_city: savedData?.wv_company_city || '',
    wv_email: savedData?.wv_email || ''
  });

  const [showCountryModal, setShowCountryModal] = useState(false);

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
    keyboardType: 'default' | 'email-address' | 'phone-pad' | 'url' = 'default'
  ) => (
    <View style={tw`mb-4`}>
      <Text style={[tw`text-base font-normal mb-2`, { color: colors.c }]}>
        {label}{required && '*'}
      </Text>
      <TextInput
        style={[
          tw`rounded-lg px-4 py-3 text-base h-12`,
          { backgroundColor: colors.w, color: colors.c }
        ]}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={colors.c_50}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
    </View>
  );

  const renderDropdownField = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    required: boolean = false,
    onPress: () => void
  ) => (
    <View style={tw`mb-4`}>
      <Text style={[tw`text-base font-normal mb-2`, { color: colors.c }]}>
        {label}{required && '*'}
      </Text>
      <TouchableOpacity
        style={[
          tw`rounded-lg px-4 py-3 flex-row justify-between items-center h-12`,
          { backgroundColor: colors.w }
        ]}
        onPress={onPress}
      >
        <Text style={[
          tw`text-base flex-1`,
          { color: formData[field] ? colors.c : colors.c_50 }
        ]}>
          {formData[field] || placeholder}
        </Text>
        <View style={tw`w-4 h-4 justify-center items-center`}>
          <Text style={[
            tw`text-sm rotate-90`,
            { color: colors.c_50, fontFamily: 'Wine-Vision' }
          ]}>
            &#xe954;
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderCountryModal = () => (
    <Modal visible={showCountryModal} transparent animationType="slide">
      <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
        <View style={[tw`rounded-t-3xl max-h-96`, { backgroundColor: colors.w }]}>
          <View style={tw`p-4 border-b border-gray-200`}>
            <Text style={[tw`text-lg font-semibold text-center`, { color: colors.c }]}>
              Select Country
            </Text>
          </View>
          <FlatList
            data={COUNTRIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`p-4 border-b border-gray-100`}
                onPress={() => {
                  handleInputChange('wv_company_country', item);
                  setShowCountryModal(false);
                }}
              >
                <Text style={[tw`text-base`, { color: colors.c }]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
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
          'First Name',
          'wv_firstName',
          'Enter your first name',
          true
        )}
        
        {renderInputField(
          'Last Name',
          'wv_lastName',
          'Enter your last name',
          true
        )}

        {renderInputField(
          'Occupation',
          'wv_professionalOccupation',
          'Enter your occupation',
          false
        )}

        {renderDropdownField(
          'Country of residence',
          'wv_company_country',
          'Select country of residence',
          true,
          () => setShowCountryModal(true)
        )}

        {renderInputField(
          'City of residence',
          'wv_company_city',
          'Enter city of residence',
          true
        )}

        {renderInputField(
          'E-mail address',
          'wv_email',
          'Enter your email address',
          true,
          'email-address'
        )}
      </ScrollView>

      {/* Modals */}
      {renderCountryModal()}
    </View>
  );
};

export default StepVsStep3;
