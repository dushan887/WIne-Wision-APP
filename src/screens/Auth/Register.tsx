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

  // Render step-specific components
  const renderStepComponent = () => {
    switch (currentStep.id) {
      case 'start':
        return (
          <StepStart
            savedData={registrationData}
            onSelectProfile={(val) => { updateData({ wv_profileSelection: val }); nextStep(); }}
            profileConfig={profileConfig}
            headerTitle={currentStep.headerTitle}
            headerSubtitle={currentStep.headerSubtitle}
          />
        );
      
      // Exhibitor Steps
      case 'wv-ex-step-1': 
        return (
          <StepExStep1 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            headerTitle={currentStep.headerTitle} 
            headerSubtitle={currentStep.headerSubtitle} 
          />
        );
      case 'wv-ex-step-2': 
        return (
          <StepExStep2 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            headerTitle={currentStep.headerTitle} 
            headerSubtitle={currentStep.headerSubtitle} 
          />
        );
      case 'wv-ex-step-3': 
        return (
          <StepExStep3 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            headerTitle={currentStep.headerTitle} 
            headerSubtitle={currentStep.headerSubtitle} 
          />
        );
      case 'wv-ex-step-4': 
        return (
          <StepExStep4 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            headerTitle={currentStep.headerTitle} 
            headerSubtitle={currentStep.headerSubtitle} 
          />
        );
      case 'wv-ex-step-5': 
        return (
          <StepExStep5 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            headerTitle={currentStep.headerTitle} 
            headerSubtitle={currentStep.headerSubtitle} 
          />
        );
      case 'wv-ex-step-6': 
        return (
          <StepExStep6 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            headerTitle={currentStep.headerTitle} 
            headerSubtitle={currentStep.headerSubtitle} 
          />
        );
      case 'wv-ex-step-7': 
        return (
          <StepExStep7 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            profile={registrationData?.wv_profileSelection}
          />
        );
      case 'wv-ex-step-8': 
        return (
          <StepExStep8 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            profile={registrationData?.wv_profileSelection}
          />
        );
      case 'wv-ex-step-9': 
        return (
          <StepExStep9 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            profile={registrationData?.wv_profileSelection}
          />
        );
      case 'wv-ex-step-10': 
        return (
          <StepExStep10 
            savedData={registrationData} 
            onUpdateData={updateData} 
            onNext={nextStep}
            profile={registrationData?.wv_profileSelection}
          />
        );
      
      // Pro-Buyer Steps
      case 'wv-pb-step-1': return (
        <StepPbStep1 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-pb-step-2': return (
        <StepPbStep2 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-pb-step-3': return (
        <StepPbStep3 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-pb-step-4': return (
        <StepPbStep4 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-pb-step-5': return (
        <StepPbStep5 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-pb-step-6': return (
        <StepPbStep6 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-pb-step-7': return (
        <StepPbStep7 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
          profile={registrationData?.wv_profileSelection}
        />
      );
      case 'wv-pb-step-8': return (
        <StepPbStep8 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
          profile={registrationData?.wv_profileSelection}
        />
      );
      case 'wv-pb-step-9': return (
        <StepPbStep9 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
          profile={registrationData?.wv_profileSelection}
        />
      );
      case 'wv-pb-step-10': return (
        <StepPbStep10 
          savedData={registrationData}
          onUpdateData={updateData}
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
          profile={registrationData?.wv_profileSelection}
        />
      );
      
      // Visitor Steps
      case 'wv-vs-step-1': return (
        <StepVsStep1 
          savedData={registrationData} 
          onUpdateData={updateData} 
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-vs-step-2': return (
        <StepVsStep2 
          savedData={registrationData} 
          onUpdateData={updateData} 
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      case 'wv-vs-step-3': return (
        <StepVsStep3 
          savedData={registrationData} 
          onUpdateData={updateData} 
          onNext={nextStep}
          headerTitle={currentStep.headerTitle}
          headerSubtitle={currentStep.headerSubtitle}
        />
      );
      
      // Common Steps (TODO: Implement these)
      case 'photos-company': 
      case 'photos-profile': 
      case 'password': 
      case 'final': 
        return <Text style={{ color: colors.w }}>Step "{currentStep.title}" - Coming Soon</Text>;
      
      default:
        return <Text style={{ color: colors.w }}>Unknown step: {currentStep.id}</Text>;
    }
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
            <Text style={[tw`text-center uppercase font-bold`, { color: colors.c, letterSpacing: 1.5 }]}>{currentStep.description}</Text>
        </View>

        {/* Render step-specific component */}
        {renderStepComponent()}

      {/* Navigation Button Container */}
      <View style={tw`mt-8 px-4`}>
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
                    color: colors.c_20
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
            {false && isLastStep && (
              <TouchableOpacity 
                onPress={handleRegister}
                disabled={loading || !canProceed}
                style={[
                  tw`flex-row items-center px-6 py-3 rounded-lg`,
                  { backgroundColor: loading || !canProceed ? colors.c_80 : colors.v }
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
            {!isLastStep && (
              <TouchableOpacity 
                onPress={() => nextStep()}
                disabled={!canProceed}
                style={tw`flex-row items-center px-4 py-3`}
              >
                <Text style={[
                  tw`font-medium mr-2`,
                  canProceed ? { color: colors.c } : { color: colors.c_50 }
                ]}>Next</Text>
                <View style={tw`relative w-6 h-6 justify-center items-center`}>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: canProceed ? colors.c_20 : colors.c_50
                  }]}>&#xe94e;</Text>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: canProceed ? colors.c : colors.c_50
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