import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');
import apiClient from '../../api';
import * as SecureStore from 'expo-secure-store';
import { useMessages } from '../../hooks';
import { useMultiStepRegistration } from '../../features/auth';
import { getProfileTheme } from '../../utils/profileTheming';
import { Button } from '../../components/common';
// Import step components
import StepStart from '../../components/registration/StepStart';
import StepExStep1 from '../../components/registration/StepExStep1';
import StepExStep2 from '../../components/registration/StepExStep2';
import StepExStep3 from '../../components/registration/StepExStep3';
import StepExStep4 from '../../components/registration/StepExStep4';
import StepExStep5 from '../../components/registration/StepExStep5';
import StepExStep6 from '../../components/registration/StepExStep6';
import StepExStep7 from '../../components/registration/StepExStep7';
import StepExStep8 from '../../components/registration/StepExStep8';
import StepExStep9 from '../../components/registration/StepExStep9';
import StepExStep10 from '../../components/registration/StepExStep10';
import StepPbStep1 from '../../components/registration/StepPbStep1';
import StepPbStep2 from '../../components/registration/StepPbStep2';
import StepPbStep3 from '../../components/registration/StepPbStep3';
import StepPbStep4 from '../../components/registration/StepPbStep4';
import StepPbStep5 from '../../components/registration/StepPbStep5';
import StepPbStep6 from '../../components/registration/StepPbStep6';
import StepPbStep7 from '../../components/registration/StepPbStep7';
import StepPbStep8 from '../../components/registration/StepPbStep8';
import StepPbStep9 from '../../components/registration/StepPbStep9';
import StepPbStep10 from '../../components/registration/StepPbStep10';
import StepVsStep1 from '../../components/registration/StepVsStep1';
import StepVsStep2 from '../../components/registration/StepVsStep2';
import StepVsStep3 from '../../components/registration/StepVsStep3';
import StepPhotosCompany from '../../components/registration/StepPhotosCompany';
import StepPhotosProfile from '../../components/registration/StepPhotosProfile';
import StepPassword from '../../components/registration/StepPassword';
import StepFinal from '../../components/registration/StepFinal';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const messages = useMessages();
  const {
    currentStep,
    steps,
    registrationData,
    nextStep,
    prevStep,
    updateData,
    pickImage,
    canProceed,
    isFirstStep,
    isLastStep,
    checkEmail,
    emailAvailable,
  } = useMultiStepRegistration();
  const [loading, setLoading] = React.useState(false);

  // Get profile-based configuration using utility
  const profileConfig = getProfileTheme(registrationData?.wv_profileSelection || null);

  // Generic step renderer helper
  const renderStep = (StepComponent: React.ComponentType<any>, extraProps = {}) => (
    <StepComponent 
      savedData={registrationData}
      onUpdateData={updateData}
      onNext={nextStep}
      headerTitle={currentStep.headerTitle}
      headerSubtitle={currentStep.headerSubtitle}
      profile={registrationData?.wv_profileSelection}
      {...extraProps}
    />
  );

  // Step component mapping
  const stepComponents = {
    // Common steps
    'start': () => (
      <StepStart
        savedData={registrationData}
        onSelectProfile={(val) => { updateData({ wv_profileSelection: val }); nextStep(); }}
        profileConfig={profileConfig}
        headerTitle={currentStep.headerTitle}
        headerSubtitle={currentStep.headerSubtitle}
      />
    ),
    'photos-company': () => renderStep(StepPhotosCompany),
    'photos-profile': () => renderStep(StepPhotosProfile),
    'password': () => renderStep(StepPassword),
    'final': () => renderStep(StepFinal),
    
    // Exhibitor steps
    'wv-ex-step-1': () => renderStep(StepExStep1),
    'wv-ex-step-2': () => renderStep(StepExStep2),
    'wv-ex-step-3': () => renderStep(StepExStep3),
    'wv-ex-step-4': () => renderStep(StepExStep4),
    'wv-ex-step-5': () => renderStep(StepExStep5),
    'wv-ex-step-6': () => renderStep(StepExStep6),
    'wv-ex-step-7': () => renderStep(StepExStep7),
    'wv-ex-step-8': () => renderStep(StepExStep8),
    'wv-ex-step-9': () => renderStep(StepExStep9),
    'wv-ex-step-10': () => renderStep(StepExStep10),
    
    // Pro-Buyer steps
    'wv-pb-step-1': () => renderStep(StepPbStep1),
    'wv-pb-step-2': () => renderStep(StepPbStep2),
    'wv-pb-step-3': () => renderStep(StepPbStep3),
    'wv-pb-step-4': () => renderStep(StepPbStep4),
    'wv-pb-step-5': () => renderStep(StepPbStep5),
    'wv-pb-step-6': () => renderStep(StepPbStep6),
    'wv-pb-step-7': () => renderStep(StepPbStep7),
    'wv-pb-step-8': () => renderStep(StepPbStep8),
    'wv-pb-step-9': () => renderStep(StepPbStep9),
    'wv-pb-step-10': () => renderStep(StepPbStep10),
    
    // Visitor steps
    'wv-vs-step-1': () => renderStep(StepVsStep1),
    'wv-vs-step-2': () => renderStep(StepVsStep2),
    'wv-vs-step-3': () => renderStep(StepVsStep3),
  };

  // Render step-specific components
  const renderStepComponent = () => {
    const stepRenderer = stepComponents[currentStep.id as keyof typeof stepComponents];
    return stepRenderer ? stepRenderer() : (
      <Text style={{ color: colors.w }}>Unknown step: {currentStep.id}</Text>
    );
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('wv/v1/register', registrationData);
      if (response.data.success) {
        await SecureStore.setItemAsync('authToken', response.data.token);
        messages.showSuccess('Registration successful!');
        navigation.navigate('Profile');
      }
    } catch (error: any) {
      messages.showError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Get the profile theme for the current registration

  return (
    <View style={tw`flex-1`}>
      {/* Header Bar */}
      <LinearGradient
        colors={profileConfig.gradientColors}
        style={tw`w-full py-4 px-4 items-center justify-center`}
      >
        <View style={tw`flex-row items-center`}>
          <Text style={[
            tw`uppercase`,
            { color: colors.w, letterSpacing: 1 }
          ]}>
            {profileConfig.titleParts.base}
          </Text>
          {profileConfig.titleParts.profile && (
            <>
              <Text style={[
                tw`mx-2`,
                { fontFamily: 'Wine-Vision', color: colors.w, fontSize: 16 }
              ]}>
                &#xe930;
              </Text>
              <Text style={[
                tw`uppercase font-bold`,
                { color: colors.w, letterSpacing: 2 }
              ]}>
                {profileConfig.titleParts.profile}
              </Text>
            </>
          )}
        </View>
      </LinearGradient>

      <ImageBackground 
        source={profileConfig.backgroundImage}
        style={tw`flex-1`}
        resizeMode="cover"
      >
      <ScrollView style={[tw`flex-1 px-4 py-8`]} contentContainerStyle={tw`pb-8`}>  
      <View style={[tw`rounded-lg`, { backgroundColor: 'rgba(255,255,255,0.5)' }]}>  
        <View style={[
          tw`mb-6 items-center justify-center p-5 rounded-t-lg`, 
          { backgroundColor: 'rgba(255,255,255,0.5)' }
        ]}>
            <Text style={[tw`text-center uppercase font-bold`, { color: colors.c, letterSpacing: 1.5 }]}>{currentStep.description} | {currentStep.id}</Text>
        </View>

        {/* Render step-specific component */}
        {renderStepComponent()}

      {/* Navigation Button Container */}
      <View style={tw`my-2 px-2`}>
        <View style={tw`flex-row justify-between items-center min-h-12`}>
          {/* Left: Previous Button */}
          <View style={tw`flex-1 items-start`}>
            {!isFirstStep && (
              <TouchableOpacity 
                onPress={prevStep}
                style={tw`flex-row items-center px-4 py-3`}
              >
                <View style={[tw`relative w-6 h-6 mr-2 justify-center items-center`, { transform: [{ rotate: '180deg' }] }]}>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: colors.w
                  }]}>&#xe94e;</Text>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: colors.c
                  }]}>&#xe94f;</Text>
                </View>
                <Text style={[tw`font-medium`, { color: colors.c }]}>Previous</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Center: Submit Button (only on last step) - HIDDEN FOR NOW */}
          <View style={tw`flex-1 items-center`}>
            {false && isLastStep && canProceed && (
              <TouchableOpacity 
                onPress={handleRegister}
                disabled={loading}
                style={[
                  tw`flex-row items-center px-6 py-3 rounded-lg`,
                  { backgroundColor: loading ? colors.c_80 : colors.v }
                ]}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.w} style={tw`mr-2`} />
                ) : (
                  <View style={tw`relative w-5 h-5 mr-2 justify-center items-center`}>
                    <Text style={[tw`font-medium text-lg absolute`, { 
                      fontFamily: 'Wine-Vision', 
                      color: colors.w
                    }]}>&#xe91a;</Text>
                  </View>
                )}
                <Text style={[tw`font-bold`, { color: colors.w }]}>
                  {loading ? 'Registering...' : 'Complete Registration'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Right: Next Button */}
          <View style={tw`flex-1 items-end pb-2`}>
            {!isLastStep && canProceed && (
              <TouchableOpacity 
                onPress={() => nextStep()}
                style={tw`flex-row items-center px-4 py-3`}
              >
                <Text style={[tw`font-medium mr-2`, { color: colors.c }]}>Next</Text>
                <View style={tw`relative w-6 h-6 justify-center items-center`}>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: colors.w
                  }]}>&#xe94e;</Text>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: colors.c
                  }]}>&#xe94f;</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
    </ImageBackground>
    </View>
  );
};

export default RegisterScreen;