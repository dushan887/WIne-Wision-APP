import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Button } from '../../components/common';
import { useMultiStepRegistration } from '../../features/auth';

type RegisterScreenNavigationProp = StackNavigationProp<any, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const {
    currentStep,
    steps,
    registrationData,
    nextStep,
    prevStep,
    updateData,
    canProceed,
    isFirstStep,
    isLastStep,
  } = useMultiStepRegistration();

  const handleNext = () => {
    if (isLastStep) {
      // TODO: Submit registration
      console.log('Submitting registration:', registrationData);
      navigation.navigate('Login');
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (isFirstStep) {
      navigation.goBack();
    } else {
      prevStep();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-4`}>Account Details</Text>
            {/* TODO: Add form fields for step 1 */}
            <Text style={tw`text-gray-600`}>
              Email, password, and confirm password fields will go here.
            </Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-4`}>Personal Information</Text>
            {/* TODO: Add form fields for step 2 */}
            <Text style={tw`text-gray-600`}>
              First name, last name, and phone fields will go here.
            </Text>
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-4`}>Professional Details</Text>
            {/* TODO: Add form fields for step 3 */}
            <Text style={tw`text-gray-600`}>
              Company, position, and industry fields will go here.
            </Text>
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-4`}>Role Selection</Text>
            {/* TODO: Add role selection */}
            <Text style={tw`text-gray-600`}>
              Role selection (visitor, exhibitor, organizer) will go here.
            </Text>
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-4`}>Preferences</Text>
            {/* TODO: Add preferences */}
            <Text style={tw`text-gray-600`}>
              Interests and notification preferences will go here.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 py-4`}>
        {/* Progress indicator */}
        <View style={tw`flex-row mb-6`}>
          {steps.map((step) => (
            <View
              key={step.id}
              style={tw`flex-1 mx-1 h-2 rounded ${
                step.id <= currentStep ? 'bg-wine-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        <Text style={tw`text-2xl font-bold text-wine-800 mb-2`}>
          Step {currentStep} of {steps.length}
        </Text>
        <Text style={tw`text-gray-600 mb-6`}>
          {steps[currentStep - 1]?.description}
        </Text>

        {renderStepContent()}

        <View style={tw`flex-row justify-between mt-8`}>
          <Button
            title={isFirstStep ? 'Cancel' : 'Back'}
            onPress={handleBack}
            variant="outline"
            size="medium"
          />
          <Button
            title={isLastStep ? 'Complete' : 'Next'}
            onPress={handleNext}
            variant="primary"
            size="medium"
            disabled={!canProceed}
          />
        </View>
      </View>
    </ScrollView>
  );
};
