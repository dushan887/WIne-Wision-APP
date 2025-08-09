import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
import { COUNTRIES, COUNTRY_CODES } from '../../utils';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep10Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
  profile?: string;
}

interface FormData {
  wv_firstName: string;
  wv_lastName: string;
  wv_professionalOccupation: string;
  wv_yearsOfExperience: string;
  wv_nationality: string;
  wv_email: string;
  wv_positionInCompany: string;
  wv_contactTelephone: string;
  wv_exhibitor_rep_whatsapp: boolean;
  wv_exhibitor_rep_viber: boolean;
}

const StepExStep10: React.FC<StepExStep10Props> = ({ 
  savedData, 
  onUpdateData, 
  onNext,
  headerTitle,
  headerSubtitle,
  profile = 'Exhibitor'
}) => {
  const [formData, setFormData] = useState<FormData>({
    wv_firstName: savedData?.wv_firstName || '',
    wv_lastName: savedData?.wv_lastName || '',
    wv_professionalOccupation: savedData?.wv_professionalOccupation || '',
    wv_yearsOfExperience: savedData?.wv_yearsOfExperience || '',
    wv_nationality: savedData?.wv_nationality || '',
    wv_email: savedData?.wv_email || '',
    wv_positionInCompany: savedData?.wv_positionInCompany || '',
    wv_contactTelephone: savedData?.wv_contactTelephone || '',
    wv_exhibitor_rep_whatsapp: savedData?.wv_exhibitor_rep_whatsapp || false,
    wv_exhibitor_rep_viber: savedData?.wv_exhibitor_rep_viber || false
  });

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showPhoneCountryModal, setShowPhoneCountryModal] = useState(false);
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState('Serbia');

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdateData?.(updatedData);
  };

  // Handle country selection for phone
  const handlePhoneCountrySelect = (country: string) => {
    setSelectedPhoneCountry(country);
    const countryInfo = COUNTRY_CODES[country];
    if (countryInfo) {
      handleInputChange('wv_contactTelephone', countryInfo.code + ' ');
    }
    setShowPhoneCountryModal(false);
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
        value={formData[field] as string}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' || keyboardType === 'url' ? 'none' : 'words'}
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

  const renderPhoneInputField = (
    label: string,
    field: keyof FormData,
    required: boolean = false
  ) => {
    const countryInfo = COUNTRY_CODES[selectedPhoneCountry];
    
    return (
      <View style={tw`mb-4`}>
        <Text style={[tw`text-base font-normal mb-2`, { color: colors.c }]}>
          {label}{required && '*'}
        </Text>
        <View style={tw`flex-row items-center`}>
          {/* Country Code Dropdown */}
          <TouchableOpacity
            style={[
              tw`rounded-l-lg px-3 h-12 flex-row items-center justify-center border-r`,
              { backgroundColor: colors.w, borderColor: colors.c_20 }
            ]}
            onPress={() => setShowPhoneCountryModal(true)}
          >
            <Text style={tw`text-base mr-2`}>{countryInfo?.flag || '🇷🇸'}</Text>
            <View style={tw`w-4 h-4 justify-center items-center`}>
              <Text style={[
                tw`text-sm rotate-90`,
                { color: colors.c_50, fontFamily: 'Wine-Vision' }
              ]}>
                &#xe954;
              </Text>
            </View>
          </TouchableOpacity>
          
          {/* Phone Number Input */}
          <TextInput
            style={[
              tw`flex-1 rounded-r-lg px-4 py-3 text-base h-12`,
              { 
                backgroundColor: colors.w, 
                color: colors.c, 
                textAlignVertical: 'center',
                lineHeight: 20
              }
            ]}
            value={formData[field] as string}
            onChangeText={(value) => handleInputChange(field, value)}
            keyboardType="phone-pad"
            placeholder="+381 123 456 789"
            placeholderTextColor={colors.c_50}
          />
          
          {/* WhatsApp/Viber Options outside phone field */}
          <TouchableOpacity
            style={[
              tw`ml-3 h-12 w-12 flex-row items-center justify-center rounded-lg`,
              { 
                backgroundColor: formData.wv_exhibitor_rep_whatsapp ? '#25D366' : colors.w,
                borderWidth: 1,
                borderColor: colors.c_20
              }
            ]}
            onPress={() => handleInputChange('wv_exhibitor_rep_whatsapp', !formData.wv_exhibitor_rep_whatsapp)}
          >
            <View style={tw`relative items-center justify-center`}>
              <Text style={[
                tw`text-2xl`,
                { 
                  fontFamily: 'Wine-Vision',
                  color: formData.wv_exhibitor_rep_whatsapp ? colors.w : colors.c_20
                }
              ]}>
                &#xe997;
              </Text>
              <Text style={[
                tw`text-2xl absolute`,
                { 
                  fontFamily: 'Wine-Vision',
                  color: formData.wv_exhibitor_rep_whatsapp ? '#25D366' : colors.w
                }
              ]}>
                &#xe998;
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              tw`ml-2 h-12 w-12 flex-row items-center justify-center rounded-lg`,
              { 
                backgroundColor: formData.wv_exhibitor_rep_viber ? '#665CAC' : colors.w,
                borderWidth: 1,
                borderColor: colors.c_20
              }
            ]}
            onPress={() => handleInputChange('wv_exhibitor_rep_viber', !formData.wv_exhibitor_rep_viber)}
          >
            <View style={tw`relative items-center justify-center`}>
              <Text style={[
                tw`text-2xl`,
                { 
                  fontFamily: 'Wine-Vision',
                  color: formData.wv_exhibitor_rep_viber ? colors.w : colors.c_20
                }
              ]}>
                &#xe98b;
              </Text>
              <Text style={[
                tw`text-2xl absolute`,
                { 
                  fontFamily: 'Wine-Vision',
                  color: formData.wv_exhibitor_rep_viber ? '#665CAC' : colors.w
                }
              ]}>
                &#xe98c;
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
                  handleInputChange('wv_nationality', item);
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

  const renderPhoneCountryModal = () => (
    <Modal visible={showPhoneCountryModal} transparent animationType="slide">
      <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
        <View style={[tw`rounded-t-3xl max-h-96`, { backgroundColor: colors.w }]}>
          <View style={tw`p-4 border-b border-gray-200`}>
            <Text style={[tw`text-lg font-semibold text-center`, { color: colors.c }]}>
              Select Country Code
            </Text>
          </View>
          <FlatList
            data={Object.keys(COUNTRY_CODES)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const countryInfo = COUNTRY_CODES[item];
              return (
                <TouchableOpacity
                  style={tw`p-4 border-b border-gray-100 flex-row items-center`}
                  onPress={() => handlePhoneCountrySelect(item)}
                >
                  <Text style={tw`text-lg mr-3`}>{countryInfo.flag}</Text>
                  <Text style={[tw`text-base mr-3`, { color: colors.c }]}>{countryInfo.code}</Text>
                  <Text style={[tw`text-base flex-1`, { color: colors.c }]}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || 'Representative Credentials'} 
        subtitle={headerSubtitle || 'YOUR REPRESENTATIVE AT THE FAIR • MARKED FIELDS (*) ARE COMPULSORY'} 
      />
      
      {/* Form Fields */}
      <ScrollView style={tw`mt-0`} showsVerticalScrollIndicator={false}>
        {renderInputField(
          'First name',
          'wv_firstName',
          '',
          true
        )}
        
        {renderInputField(
          'Last name',
          'wv_lastName',
          '',
          true
        )}

        {renderInputField(
          'Professional occupation',
          'wv_professionalOccupation',
          '',
          false
        )}

        {renderInputField(
          'Years of professional experience',
          'wv_yearsOfExperience',
          '',
          false,
          'numeric'
        )}

        {renderDropdownField(
          'Country of residence',
          'wv_nationality',
          '— Select country —',
          true,
          () => setShowCountryModal(true)
        )}

        {renderInputField(
          'E-mail address',
          'wv_email',
          '',
          true,
          'email-address'
        )}

        {renderInputField(
          'Position in the company',
          'wv_positionInCompany',
          '',
          false
        )}

        {renderPhoneInputField(
          'Contact (telephone number)',
          'wv_contactTelephone',
          true
        )}
      </ScrollView>

      {/* Modals */}
      {renderCountryModal()}
      {renderPhoneCountryModal()}
    </View>
  );
};

export default StepExStep10;
