import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, FlatList, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
import { COUNTRIES, getProfileTheme, COUNTRY_CODES } from '../../utils';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep7Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
  profile?: 'Exhibitor' | 'Buyer' | 'Visitor' | null;
}

interface FormData {
  wv_company_name: string;
  wv_company_pobRegion: string;
  wv_company_country: string;
  wv_company_email: string;
  wv_company_city: string;
  wv_company_website: string;
  wv_company_address: string;
  wv_company_phone: string;
  wv_governmentSupport: boolean;
}

const StepPbStep7: React.FC<StepPbStep7Props> = ({ 
  savedData, 
  onUpdateData, 
  onNext,
  headerTitle,
  headerSubtitle,
  profile = 'Buyer'
}) => {
  const [formData, setFormData] = useState<FormData>({
    wv_company_name: savedData?.wv_company_name || '',
    wv_company_pobRegion: savedData?.wv_company_pobRegion || '',
    wv_company_country: savedData?.wv_company_country || '',
    wv_company_email: savedData?.wv_company_email || '',
    wv_company_city: savedData?.wv_company_city || '',
    wv_company_website: savedData?.wv_company_website || '',
    wv_company_address: savedData?.wv_company_address || '',
    wv_company_phone: savedData?.wv_company_phone || '',
    wv_governmentSupport: savedData?.wv_governmentSupport || false
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
      // Set the phone field to just the country code
      handleInputChange('wv_company_phone', countryInfo.code + ' ');
    }
    setShowPhoneCountryModal(false);
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
          { 
            backgroundColor: colors.w, 
            color: colors.c, 
            textAlignVertical: 'center',
            lineHeight: 20
          }
        ]}
        value={formData[field] as string}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={colors.c_50}
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
        <View style={tw`flex-row`}>
          {/* Country Code Dropdown */}
          <TouchableOpacity
            style={[
              tw`rounded-l-lg px-3 h-12 flex-row items-center justify-center border-r`,
              { backgroundColor: colors.w, borderColor: colors.c_20 }
            ]}
            onPress={() => setShowPhoneCountryModal(true)}
          >
            <Text style={tw`text-base mr-2`}>{countryInfo?.flag || '🏳️'}</Text>
            <View style={tw`w-4 h-4 justify-center items-center`}>
              <Text style={[
                tw`text-sm rotate-90`,
                { color: colors.c_50, fontFamily: 'Wine-Vision' }
              ]}>
                &#xe954;
              </Text>
            </View>
          </TouchableOpacity>
          
          {/* Phone Number Input - Contains full phone number */}
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
        </View>
      </View>
    );
  };

  const renderCheckboxField = () => {
    const selected = formData.wv_governmentSupport;
    
    // Get background styling for the card
    const getCardBackgroundStyling = () => {
      if (!selected) {
        return { useImage: false, backgroundColor: 'rgba(255,255,255,0.5)' };
      }
      
      // Get the theme colors for the selected state
      const optionTheme = getProfileTheme(profile || 'Buyer');
      
      if (optionTheme.useImageForSelection && optionTheme.selectionBackgroundImage) {
        return { 
          useImage: true, 
          backgroundImage: optionTheme.selectionBackgroundImage 
        };
      } else {
        return { 
          useImage: false, 
          backgroundColor: optionTheme.selectionColors.light 
        };
      }
    };

    const backgroundStyling = getCardBackgroundStyling();
    
    return (
      <View style={tw`mb-4`}>
        <TouchableOpacity
          style={[
            tw`rounded-lg overflow-hidden w-full`,
            !backgroundStyling.useImage && { backgroundColor: backgroundStyling.backgroundColor }
          ]}
          onPress={() => handleInputChange('wv_governmentSupport', !formData.wv_governmentSupport)}
        >
          {backgroundStyling.useImage ? (
            <ImageBackground
              source={backgroundStyling.backgroundImage}
              style={tw`w-full`}
              imageStyle={tw`rounded-lg`}
              resizeMode="cover"
            >
              <View style={tw`flex-row items-center px-4 py-3 min-h-16`}>  
                {/* Check Icon */}
                <View style={[
                  tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                  { backgroundColor: colors.w }
                ]}>
                  <View style={tw`relative items-center justify-center`}>
                    <Text style={[
                      tw`text-2xl`,
                      { fontFamily: 'Wine-Vision', color: selected ? colors.g : colors.c_20 }
                    ]}>&#xe949;</Text>
                    <Text style={[
                      tw`text-2xl absolute`,
                      { fontFamily: 'Wine-Vision', color: colors.w }
                    ]}>&#xe94a;</Text>
                  </View>
                </View>
                
                {/* Label */}
                <Text style={[
                  tw`text-base flex-1`,
                  { 
                    color: selected ? colors.w : colors.c,
                    fontWeight: selected ? '700' : '500'
                  }
                ]}>
                  Apply for Hosted Buyers Program
                </Text>
              </View>
            </ImageBackground>
          ) : (
            <View style={tw`flex-row items-center px-4 py-3 min-h-16`}>  
              {/* Check Icon */}
              <View style={[
                tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                { backgroundColor: colors.w }
              ]}>
                <View style={tw`relative items-center justify-center`}>
                  <Text style={[
                    tw`text-2xl`,
                    { fontFamily: 'Wine-Vision', color: selected ? colors.g : colors.c_20 }
                  ]}>&#xe949;</Text>
                  <Text style={[
                    tw`text-2xl absolute`,
                    { fontFamily: 'Wine-Vision', color: colors.w }
                  ]}>&#xe94a;</Text>
                </View>
              </View>
              
              {/* Label */}
              <Text style={[
                tw`text-base flex-1`,
                { 
                  color: selected ? colors.c : colors.c,
                  fontWeight: selected ? '700' : '500'
                }
              ]}>
                Apply for Hosted Buyers Program
              </Text>
            </View>
          )}
        </TouchableOpacity>
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

  const renderPhoneCountryModal = () => (
    <Modal visible={showPhoneCountryModal} transparent animationType="slide">
      <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
        <View style={[tw`rounded-t-3xl max-h-96`, { backgroundColor: colors.w }]}>
          <View style={tw`p-4 border-b border-gray-200`}>
            <Text style={[tw`text-lg font-semibold text-center`, { color: colors.c }]}>
              Select Country for Phone
            </Text>
          </View>
          <FlatList
            data={Object.keys(COUNTRY_CODES)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`p-4 border-b border-gray-100 flex-row items-center`}
                onPress={() => handlePhoneCountrySelect(item)}
              >
                <Text style={tw`text-base mr-3`}>{COUNTRY_CODES[item]?.flag || '🏳️'}</Text>
                <Text style={[tw`text-base flex-1`, { color: colors.c }]}>{item}</Text>
                <Text style={[tw`text-base`, { color: colors.c_50 }]}>{COUNTRY_CODES[item]?.code}</Text>
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
          'Official company name in English',
          'wv_company_name',
          'Enter official company name',
          true
        )}
        
        {renderInputField(
          'P.O.B. / area / municipality / region',
          'wv_company_pobRegion',
          'Enter P.O.B. / area / municipality / region',
          true
        )}

        {renderDropdownField(
          'Country of residence',
          'wv_company_country',
          '— Select country —',
          true,
          () => setShowCountryModal(true)
        )}

        {renderInputField(
          'E-mail address',
          'wv_company_email',
          'Enter email address',
          true,
          'email-address'
        )}

        {renderInputField(
          'City of residence',
          'wv_company_city',
          'Enter city of residence',
          true
        )}

        {renderInputField(
          'Website',
          'wv_company_website',
          'Enter website URL',
          false,
          'url'
        )}

        {renderInputField(
          'Address (street and number)',
          'wv_company_address',
          'Enter street address and number',
          true
        )}

        {renderPhoneInputField(
          'Contact (telephone number)',
          'wv_company_phone',
          true
        )}

        {renderCheckboxField()}
      </ScrollView>

      {/* Modals */}
      {renderCountryModal()}
      {renderPhoneCountryModal()}
    </View>
  );
};

export default StepPbStep7;
