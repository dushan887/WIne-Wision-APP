/**
 * Registration Flow Demo Screen
 * Wine Vision App - Test and demo the registration flow navigation system
 */

import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { 
  WineVisionCard, 
  WineVisionText, 
  Button 
} from '@/components/common';
import CustomHeader from '@/components/common/CustomHeader';
import { useRegistrationFlow } from '@/hooks/useRegistrationFlow';

interface RegistrationFlowDemoProps {}

export const RegistrationFlowDemo: React.FC<RegistrationFlowDemoProps> = React.memo(() => {
  const [testFormData, setTestFormData] = useState<Record<string, any>>({});
  
  const {
    state,
    navigateNext,
    navigatePrevious,
    submitRegistration,
    updateStepData,
    getStepData,
    validateCurrentStep,
    getCurrentStepConfig,
    getStepComponent,
    getFormattedProgress,
    getStepTitle,
    clearSession,
  } = useRegistrationFlow();

  // Test data for different scenarios
  const getTestDataForStep = (stepKey: string) => {
    const testData: Record<string, Record<string, any>> = {
      '1': {
        wv_profileSelection: 'Exhibitor'
      },
      'wv-ex-step-1': {
        wv_fieldOfWork: 'Wine'
      },
      'wv-ex-step-2': {
        wv_participationModel: 'Company'
      },
      'wv-ex-step-3': {
        wv_userCategory: 'Winemaker'
      },
      'wv-ex-step-5': {
        wv_exhibitingProducts: 'Red Wine, White Wine'
      },
      'wv-ex-step-6': {
        wv_companyDescription: 'Test company description for demo purposes.'
      },
      'wv-ex-step-7': {
        wv_company_name: 'Demo Winery',
        wv_company_pobRegion: 'Bordeaux',
        wv_company_country: 'France',
        wv_company_email: 'info@demowinery.com',
        wv_company_city: 'Bordeaux',
        wv_company_address: '123 Wine Street',
        wv_company_phone: '+33123456789'
      },
      'wv-ex-step-8': {
        wv_company_vatRegistryNumber: 'FR12345678901'
      },
      'wv-ex-step-10': {
        wv_firstName: 'John',
        wv_lastName: 'Doe',
        wv_nationality: 'French',
        wv_email: 'john.doe@demowinery.com',
        wv_positionInCompany: 'Winemaker',
        wv_contactTelephone: '+33123456789'
      },
      'wv-g-photo-company': {
        'wv_user-logo': 'demo-logo.jpg'
      },
      'wv-g-photo-profile': {
        'wv_user-avatar': 'demo-avatar.jpg'
      },
      'wv-g-password': {
        wv_user_password: 'DemoPassword123!',
        wv_password_confirm: 'DemoPassword123!',
        terms_conditions: 'on'
      },
      'final': {
        terms_conditions_final: 'on'
      }
    };
    
    return testData[stepKey] || {};
  };

  const handleFillTestData = () => {
    const testData = getTestDataForStep(state.currentStep);
    if (Object.keys(testData).length > 0) {
      updateStepData(state.currentStep, testData);
      setTestFormData(prev => ({ ...prev, [state.currentStep]: testData }));
    }
  };

  const handleValidateStep = () => {
    const validation = validateCurrentStep();
    console.log('Validation result:', validation);
  };

  const handleNavigateNext = async () => {
    const success = await navigateNext();
    console.log('Navigation result:', success);
  };

  const handleNavigatePrevious = () => {
    const success = navigatePrevious();
    console.log('Previous navigation result:', success);
  };

  const handleSubmitRegistration = async () => {
    const success = await submitRegistration();
    console.log('Submission result:', success);
  };

  const handleTestFullFlow = async () => {
    // Auto-fill and progress through multiple steps
    const steps = ['1', 'wv-ex-step-1', 'wv-ex-step-2', 'wv-ex-step-3'];
    
    for (const step of steps) {
      const testData = getTestDataForStep(step);
      updateStepData(step, testData);
      await new Promise(resolve => setTimeout(resolve, 500));
      if (step !== steps[steps.length - 1]) {
        await navigateNext();
      }
    }
  };

  const config = getCurrentStepConfig();
  const progress = getFormattedProgress();
  const stepData = getStepData(state.currentStep);

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <CustomHeader isAuthenticated={false} />
      
      <View style={tw`p-4 border-b border-gray-800`}>
        <WineVisionText style={tw`text-xl font-bold text-white text-center`}>
          Registration Flow Demo
        </WineVisionText>
      </View>
      
      <ScrollView 
        style={tw`flex-1`}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
      >
        {/* Current State Display */}
        <WineVisionCard style={tw`mb-4`}>
          <WineVisionText style={tw`text-lg font-bold mb-2 text-white`}>
            Current Flow State
          </WineVisionText>
          
          <View style={tw`space-y-2`}>
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Current Step:</Text> {state.currentStep}
            </WineVisionText>
            
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Step Title:</Text> {getStepTitle()}
            </WineVisionText>
            
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Component:</Text> {getStepComponent() || 'N/A'}
            </WineVisionText>
            
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Progress:</Text> {progress.current}/{progress.total} ({progress.percentage}%)
            </WineVisionText>
            
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Can Go Next:</Text> {state.canGoNext ? 'Yes' : 'No'}
            </WineVisionText>
            
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Can Go Previous:</Text> {state.canGoPrevious ? 'Yes' : 'No'}
            </WineVisionText>
            
            <WineVisionText style={tw`text-white`}>
              <Text style={tw`font-bold`}>Loading:</Text> {state.isLoading ? 'Yes' : 'No'}
            </WineVisionText>
          </View>
        </WineVisionCard>

        {/* Step Configuration */}
        {config && (
          <WineVisionCard style={tw`mb-4`}>
            <WineVisionText style={tw`text-lg font-bold mb-2 text-white`}>
              Step Configuration
            </WineVisionText>
            
            <View style={tw`space-y-2`}>
              <WineVisionText style={tw`text-white`}>
                <Text style={tw`font-bold`}>Required Fields:</Text> {config.required.join(', ') || 'None'}
              </WineVisionText>
              
              <WineVisionText style={tw`text-white`}>
                <Text style={tw`font-bold`}>Condition Field:</Text> {config.conditionField || 'None'}
              </WineVisionText>
              
              <WineVisionText style={tw`text-white`}>
                <Text style={tw`font-bold`}>Next Form:</Text> {
                  typeof config.nextForm === 'string' 
                    ? config.nextForm 
                    : Array.isArray(config.nextForm) 
                      ? `${config.nextForm.length} conditions`
                      : 'None'
                }
              </WineVisionText>
            </View>
          </WineVisionCard>
        )}

        {/* Current Step Data */}
        <WineVisionCard style={tw`mb-4`}>
          <WineVisionText style={tw`text-lg font-bold mb-2 text-white`}>
            Current Step Data
          </WineVisionText>
          
          {Object.keys(stepData).length > 0 ? (
            <View style={tw`space-y-1`}>
              {Object.entries(stepData).map(([key, value]) => (
                <WineVisionText key={key} style={tw`text-white text-sm`}>
                  <Text style={tw`font-bold`}>{key}:</Text> {
                    Array.isArray(value) 
                      ? value.join(', ') 
                      : String(value)
                  }
                </WineVisionText>
              ))}
            </View>
          ) : (
            <WineVisionText style={tw`text-gray-400 italic`}>
              No data for current step
            </WineVisionText>
          )}
        </WineVisionCard>

        {/* Navigation Path */}
        <WineVisionCard style={tw`mb-4`}>
          <WineVisionText style={tw`text-lg font-bold mb-2 text-white`}>
            Navigation Path
          </WineVisionText>
          
          {state.navigationPath.length > 0 ? (
            <WineVisionText style={tw`text-white`}>
              {state.navigationPath.join(' → ')} → <Text style={tw`font-bold text-wv-yellow`}>{state.currentStep}</Text>
            </WineVisionText>
          ) : (
            <WineVisionText style={tw`text-gray-400 italic`}>
              Starting step
            </WineVisionText>
          )}
        </WineVisionCard>

        {/* Action Buttons */}
        <WineVisionCard style={tw`mb-4`}>
          <WineVisionText style={tw`text-lg font-bold mb-4 text-white`}>
            Flow Controls
          </WineVisionText>
          
          <View style={tw`space-y-3`}>
            {/* Data Management */}
            <View style={tw`flex-row space-x-2`}>
              <Button
                title="Fill Test Data"
                onPress={handleFillTestData}
                variant="secondary"
              />
              <Button
                title="Validate Step"
                onPress={handleValidateStep}
                variant="secondary"
              />
            </View>

            {/* Navigation */}
            <View style={tw`flex-row space-x-2`}>
              <Button
                title="Previous"
                onPress={handleNavigatePrevious}
                disabled={!state.canGoPrevious || state.isLoading}
                variant="outline"
              />
              <Button
                title="Next"
                onPress={handleNavigateNext}
                disabled={!state.canGoNext || state.isLoading}
                variant="primary"
              />
            </View>

            {/* Special Actions */}
            <View style={tw`flex-row space-x-2`}>
              <Button
                title="Test Full Flow"
                onPress={handleTestFullFlow}
                variant="secondary"
              />
              <Button
                title="Submit"
                onPress={handleSubmitRegistration}
                disabled={state.isLoading}
                variant="primary"
              />
            </View>

            {/* Session Management */}
            <Button
              title="Clear Session"
              onPress={clearSession}
              variant="secondary"
            />
          </View>
        </WineVisionCard>

        {/* Session Data Overview */}
        <WineVisionCard>
          <WineVisionText style={tw`text-lg font-bold mb-2 text-white`}>
            Session Data Overview
          </WineVisionText>
          
          {Object.keys(state.sessionData).length > 0 ? (
            <ScrollView style={tw`max-h-40`}>
              {Object.entries(state.sessionData).map(([key, value]) => (
                <WineVisionText key={key} style={tw`text-white text-xs mb-1`}>
                  <Text style={tw`font-bold`}>{key}:</Text> {
                    typeof value === 'object' 
                      ? JSON.stringify(value, null, 2).substring(0, 100) + '...'
                      : String(value)
                  }
                </WineVisionText>
              ))}
            </ScrollView>
          ) : (
            <WineVisionText style={tw`text-gray-400 italic`}>
              No session data
            </WineVisionText>
          )}
        </WineVisionCard>
      </ScrollView>
    </SafeAreaView>
  );
});

RegistrationFlowDemo.displayName = 'RegistrationFlowDemo';
