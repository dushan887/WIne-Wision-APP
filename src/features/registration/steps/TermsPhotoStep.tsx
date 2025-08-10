import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useRegistration } from '../RegistrationProvider';
import { theme } from '../../../theme';

const TermsPhotoStep: React.FC = () => {
  const { formData, updateField, formData: { errors } } = useRegistration();

  const handlePhotoSelection = () => {
    Alert.alert(
      'Add Profile Photo',
      'Choose how you would like to add your photo',
      [
        { text: 'Take Photo', onPress: () => console.log('Take photo') },
        { text: 'Choose from Gallery', onPress: () => console.log('Choose from gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={tw`gap-6`}>
      <Text style={theme.styles.typography.h2}>Final Steps</Text>
      <Text style={[theme.styles.typography.body, tw`mb-4`]}>
        Almost done! Please review and accept our terms.
      </Text>

      {/* Photo Upload */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-3`]}>Profile Photo (Optional)</Text>
        <TouchableOpacity
          onPress={handlePhotoSelection}
          style={[
            tw`p-8 rounded-lg border-2 border-dashed items-center`,
            { borderColor: theme.colors.carbon[20] },
          ]}
        >
          {formData.photoUri ? (
            <View style={tw`items-center`}>
              <Text style={[theme.styles.typography.h4, { color: theme.colors.velvet.base }]}>✓ Photo Selected</Text>
              <Text style={[theme.styles.typography.bodySmall, tw`mt-1`]}>Tap to change</Text>
            </View>
          ) : (
            <View style={tw`items-center`}>
              <Text style={[tw`text-4xl mb-2`]}>📷</Text>
              <Text style={[theme.styles.typography.h4, tw`mb-1`]}>Add Profile Photo</Text>
              <Text style={[theme.styles.typography.bodySmall, { color: theme.colors.carbon[50] }]}>
                Help others recognize you
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-3`]}>Terms & Conditions *</Text>
        <View style={[tw`p-4 rounded-lg border`, { backgroundColor: theme.colors.carbon[5], borderColor: theme.colors.carbon[20] }]}>
          <Text style={[theme.styles.typography.bodySmall, tw`mb-3`]}>
            By registering for Wine Vision 2025, you agree to:
          </Text>
          <Text style={[theme.styles.typography.bodySmall, tw`mb-2`]}>
            • Our Terms of Service and Privacy Policy
          </Text>
          <Text style={[theme.styles.typography.bodySmall, tw`mb-2`]}>
            • Receive event-related communications
          </Text>
          <Text style={[theme.styles.typography.bodySmall, tw`mb-3`]}>
            • Follow event guidelines and code of conduct
          </Text>
          
          <TouchableOpacity
            onPress={() => updateField('termsAccepted', !formData.termsAccepted)}
            style={tw`flex-row items-center`}
          >
            <View
              style={[
                tw`w-6 h-6 rounded border-2 mr-3 items-center justify-center`,
                formData.termsAccepted ? { backgroundColor: theme.colors.velvet.base } : { backgroundColor: theme.colors.white },
                formData.termsAccepted ? { borderColor: theme.colors.velvet.base } : { borderColor: theme.colors.carbon[20] },
              ]}
            >
              {formData.termsAccepted && (
                <Text style={[tw`text-sm font-bold`, { color: theme.colors.white }]}>✓</Text>
              )}
            </View>
            <Text style={[theme.styles.typography.body, { flex: 1 }]}>
              I accept the Terms & Conditions *
            </Text>
          </TouchableOpacity>
        </View>
        {errors.termsAccepted && (
          <Text style={[tw`mt-2 text-sm`, { color: theme.colors.red }]}>{errors.termsAccepted}</Text>
        )}
      </View>

      {/* Summary */}
      <View style={[tw`p-4 rounded-lg`, { backgroundColor: theme.colors.velvet[10] }]}>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Registration Summary</Text>
        <Text style={[theme.styles.typography.bodySmall, tw`mb-1`]}>
          <Text style={tw`font-semibold`}>Name:</Text> {formData.firstName} {formData.lastName}
        </Text>
        <Text style={[theme.styles.typography.bodySmall, tw`mb-1`]}>
          <Text style={tw`font-semibold`}>Email:</Text> {formData.email}
        </Text>
        <Text style={[theme.styles.typography.bodySmall, tw`mb-1`]}>
          <Text style={tw`font-semibold`}>Role:</Text> {formData.role}
        </Text>
        <Text style={[theme.styles.typography.bodySmall, tw`mb-1`]}>
          <Text style={tw`font-semibold`}>Company:</Text> {formData.companyName}
        </Text>
      </View>
    </View>
  );
};

export default TermsPhotoStep;
