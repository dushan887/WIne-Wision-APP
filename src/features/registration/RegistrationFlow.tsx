import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useRegistration } from './RegistrationProvider';
import { theme } from '../../theme';

// Import step components (these would be created separately)
import PersonalInfoStep from './steps/PersonalInfoStep';
import PasswordStep from './steps/PasswordStep';
import RoleCompanyStep from './steps/RoleCompanyStep';
import AddressStep from './steps/AddressStep';
import TermsPhotoStep from './steps/TermsPhotoStep';

// Progress indicator component
const ProgressIndicator: React.FC<{ currentStep: number; totalSteps: number }> = React.memo(
  ({ currentStep, totalSteps }) => {
    return (
      <View style={[tw`flex-row justify-between mb-6`, { paddingHorizontal: 20 }]}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <View key={stepNumber} style={tw`flex-1 items-center`}>
              <View
                style={[
                  tw`w-8 h-8 rounded-full items-center justify-center mb-2`,
                  isActive
                    ? theme.styles.bg.velvet
                    : isCompleted
                    ? theme.styles.bg.carbon
                    : theme.styles.bg.carbon20,
                ]}
              >
                <Text
                  style={[
                    tw`text-sm font-semibold`,
                    isActive || isCompleted ? theme.styles.text.white : theme.styles.text.carbon,
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>
              {index < totalSteps - 1 && (
                <View
                  style={[
                    tw`absolute top-4 left-1/2 w-full h-0.5`,
                    { marginLeft: 16, width: '100%' },
                    isCompleted ? theme.styles.bg.carbon : theme.styles.bg.carbon20,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
);

// Step titles
const stepTitles = [
  'Personal Information',
  'Create Password',
  'Role & Company',
  'Address Details',
  'Terms & Photo',
];

// Main RegistrationFlow component
const RegistrationFlow: React.FC = () => {
  const navigation = useNavigation();
  const {
    formData,
    nextStep,
    prevStep,
    setSubmitting,
    validateCurrentStep,
    isStepValid,
    resetForm,
  } = useRegistration();

  const { currentStep, isSubmitting } = formData;
  const totalSteps = 5;

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      Alert.alert(
        'Exit Registration',
        'Are you sure you want to exit? Your progress will be lost.',
        [
          { text: 'Stay', style: 'cancel' },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              resetForm();
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      prevStep();
    }
  }, [currentStep, prevStep, resetForm, navigation]);

  // Handle next step
  const handleNext = useCallback(async () => {
    if (validateCurrentStep()) {
      if (currentStep === totalSteps) {
        // Final submission
        await handleSubmission();
      } else {
        nextStep();
      }
    }
  }, [validateCurrentStep, currentStep, totalSteps, nextStep]);

  // Handle form submission
  const handleSubmission = useCallback(async () => {
    try {
      setSubmitting(true);
      
      // Create FormData for multipart upload
      const submissionData = new FormData();
      
      // Add basic fields
      submissionData.append('firstName', formData.firstName);
      submissionData.append('lastName', formData.lastName);
      submissionData.append('email', formData.email);
      submissionData.append('phone', formData.phone);
      submissionData.append('password', formData.password);
      submissionData.append('role', formData.role);
      submissionData.append('companyName', formData.companyName);
      submissionData.append('jobTitle', formData.jobTitle);
      submissionData.append('country', formData.country);
      submissionData.append('city', formData.city);
      submissionData.append('address', formData.address);
      
      // Add role-specific fields
      if (formData.role === 'exhibitor' && formData.exhibitorFields) {
        Object.entries(formData.exhibitorFields).forEach(([key, value]) => {
          submissionData.append(`exhibitor_${key}`, value);
        });
      }
      
      if (formData.role === 'buyer' && formData.buyerFields) {
        Object.entries(formData.buyerFields).forEach(([key, value]) => {
          submissionData.append(`buyer_${key}`, value);
        });
      }
      
      if (formData.role === 'visitor' && formData.visitorFields) {
        Object.entries(formData.visitorFields).forEach(([key, value]) => {
          submissionData.append(`visitor_${key}`, value);
        });
      }
      
      // Add photo if present
      if (formData.photoUri) {
        submissionData.append('photo', {
          uri: formData.photoUri,
          type: 'image/jpeg',
          name: 'profile-photo.jpg',
        } as any);
      }
      
      // Submit to API (you would replace this with your actual API call)
      // const response = await registerUser(submissionData);
      
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Registration Successful!',
        'Welcome to Wine Vision 2025. Please check your email to verify your account.',
        [
          {
            text: 'Continue',
            onPress: () => {
              resetForm();
              navigation.navigate('Login' as never);
            },
          },
        ]
      );
      
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        'There was an error creating your account. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSubmitting(false);
    }
  }, [formData, setSubmitting, resetForm, navigation]);

  // Render current step content
  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <PasswordStep />;
      case 3:
        return <RoleCompanyStep />;
      case 4:
        return <AddressStep />;
      case 5:
        return <TermsPhotoStep />;
      default:
        return null;
    }
  }, [currentStep]);

  // Set up navigation header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: stepTitles[currentStep - 1] || 'Registration',
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBack}
          style={[tw`p-2 -ml-2`]}
          accessible={true}
          accessibilityLabel="Go back"
        >
          <Text style={[tw`text-lg`, theme.styles.text.velvet]}>
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentStep, handleBack]);

  return (
    <KeyboardAvoidingView
      style={[tw`flex-1`, theme.styles.bg.white]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`pb-8`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={[tw`pt-6`, theme.styles.bg.carbon5]}>
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </View>

        {/* Step Content */}
        <View style={tw`flex-1 px-6 pt-6`}>
          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[tw`p-6 border-t`, theme.styles.bg.white, theme.styles.border.carbon10]}>
        <View style={tw`flex-row gap-4`}>
          {currentStep > 1 && (
            <TouchableOpacity
              onPress={prevStep}
              style={[
                tw`flex-1 py-4 px-6 rounded-lg border`,
                theme.styles.bg.white,
                theme.styles.border.carbon20,
              ]}
              disabled={isSubmitting}
            >
              <Text style={[tw`text-center font-semibold`, theme.styles.text.carbon]}>
                Previous
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={handleNext}
            style={[
              tw`py-4 px-6 rounded-lg`,
              currentStep === 1 ? tw`flex-1` : tw`flex-1`,
              isStepValid(currentStep) ? theme.styles.bg.velvet : theme.styles.bg.carbon20,
            ]}
            disabled={isSubmitting || !isStepValid(currentStep)}
          >
            <Text
              style={[
                tw`text-center font-semibold`,
                isStepValid(currentStep) ? theme.styles.text.white : theme.styles.text.carbon,
              ]}
            >
              {isSubmitting
                ? 'Please wait...'
                : currentStep === totalSteps
                ? 'Complete Registration'
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationFlow;
