/**
 * Registration Notifications Demo Screen
 * Wine Vision App - Test and demo registration notifications
 */

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { 
  WineVisionCard, 
  WineVisionText, 
  Button 
} from '@/components/common';
import CustomHeader from '@/components/common/CustomHeader';
import { useRegistrationNotifications } from '@/hooks';

interface RegistrationNotificationDemoProps {}

export const RegistrationNotificationDemo: React.FC<RegistrationNotificationDemoProps> = React.memo(() => {
  const [selectedUserType, setSelectedUserType] = useState<'exhibitor' | 'buyer' | 'visitor'>('exhibitor');
  const [currentStep, setCurrentStep] = useState(1);
  
  const notifications = useRegistrationNotifications();

  const handleWelcomeFlow = () => {
    notifications.showWelcome(selectedUserType);
  };

  const handleStepStart = () => {
    notifications.startStep(currentStep, selectedUserType);
  };

  const handleStepComplete = () => {
    notifications.completeStep(currentStep, selectedUserType);
    
    const totalSteps = notifications.getTotalSteps(selectedUserType);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleValidationError = () => {
    const errors = [
      'Company name is required',
      'Email address is invalid',
      'Phone number is missing'
    ];
    notifications.validateStep(currentStep, selectedUserType, errors);
  };

  const handlePhotoUpload = async () => {
    // Simulate photo upload
    const mockUpload = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.3) {
            resolve({ url: 'https://example.com/photo.jpg' });
          } else {
            reject(new Error('Upload failed - file size too large'));
          }
        }, 2000);
      });
    };

    try {
      await notifications.handlePhotoUpload('profile', mockUpload);
    } catch (error) {
      // Error already handled by notification system
    }
  };

  const handlePasswordTest = () => {
    // Test weak password
    setTimeout(() => {
      notifications.validatePassword('123');
    }, 500);
    
    // Test strong password
    setTimeout(() => {
      notifications.validatePassword('StrongPass123!', 'StrongPass123!');
    }, 2000);
  };

  const handleRegistrationComplete = async () => {
    // Simulate registration submission
    const mockSubmit = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) {
            resolve({ userId: '12345', status: 'pending_verification' });
          } else {
            reject(new Error('Registration failed - email already exists'));
          }
        }, 3000);
      });
    };

    try {
      await notifications.completeRegistration(selectedUserType, mockSubmit);
    } catch (error) {
      // Error already handled by notification system
    }
  };

  const handleConnectionTest = () => {
    notifications.handleConnectionLoss();
    
    setTimeout(() => {
      notifications.handleConnectionRestore();
    }, 3000);
  };

  const resetDemo = () => {
    notifications.clearAllNotifications();
    setCurrentStep(1);
  };

  const userTypes: Array<'exhibitor' | 'buyer' | 'visitor'> = ['exhibitor', 'buyer', 'visitor'];

  return (
    <SafeAreaView style={[tw`flex-1`, {backgroundColor: 'rgb(11,5,28)'}]}>
      <CustomHeader isAuthenticated={false} />
      
      <ScrollView 
        style={tw`flex-1 px-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`py-6`}>
          
          {/* User Type Selection */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Select User Type
            </WineVisionText>
            
            <View style={tw`flex-row mb-4`}>
              {userTypes.map((type, index) => (
                <View key={type} style={[tw`flex-1`, index > 0 && tw`ml-2`]}>
                  <Button
                    title={type.charAt(0).toUpperCase() + type.slice(1)}
                    onPress={() => setSelectedUserType(type)}
                    variant={selectedUserType === type ? 'primary' : 'secondary'}
                  />
                </View>
              ))}
            </View>
            
            <WineVisionText variant="body" style={{color: 'rgb(206,205,210)'}}>
              Current: {selectedUserType.charAt(0).toUpperCase() + selectedUserType.slice(1)} 
              (Step {currentStep} of {notifications.getTotalSteps(selectedUserType)})
            </WineVisionText>
          </WineVisionCard>

          {/* Welcome Flow */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Welcome Flow
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-4`}>
              Test the user onboarding welcome messages for the selected user type.
            </WineVisionText>
            
            <Button
              title="Show Welcome Messages"
              onPress={handleWelcomeFlow}
              variant="primary"
            />
          </WineVisionCard>

          {/* Step Management */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Step Management
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-4`}>
              Test step-by-step progress notifications with automatic progress tracking.
            </WineVisionText>
            
            <View>
              <Button
                title={`Start Step ${currentStep}`}
                onPress={handleStepStart}
                variant="primary"
              />
              
              <View style={tw`mt-3`}>
                <Button
                  title={`Complete Step ${currentStep}`}
                  onPress={handleStepComplete}
                  variant="secondary"
                />
              </View>
              
              <View style={tw`mt-3`}>
                <Button
                  title="Show Validation Errors"
                  onPress={handleValidationError}
                  variant="outline"
                />
              </View>
            </View>
          </WineVisionCard>

          {/* Photo Upload */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Photo Upload
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-4`}>
              Test photo upload notifications with simulated success/failure.
            </WineVisionText>
            
            <Button
              title="Simulate Photo Upload"
              onPress={handlePhotoUpload}
              variant="primary"
            />
          </WineVisionCard>

          {/* Password Validation */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Password Validation
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-4`}>
              Test password strength validation with real-time feedback.
            </WineVisionText>
            
            <Button
              title="Test Password Validation"
              onPress={handlePasswordTest}
              variant="primary"
            />
          </WineVisionCard>

          {/* Registration Completion */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Registration Completion
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-4`}>
              Test the complete registration flow with success/error handling.
            </WineVisionText>
            
            <Button
              title="Complete Registration"
              onPress={handleRegistrationComplete}
              variant="primary"
            />
          </WineVisionCard>

          {/* Connection Status */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Connection Status
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-4`}>
              Test connection loss and restoration notifications.
            </WineVisionText>
            
            <Button
              title="Simulate Connection Issues"
              onPress={handleConnectionTest}
              variant="outline"
            />
          </WineVisionCard>

          {/* Demo Controls */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              Demo Controls
            </WineVisionText>
            
            <View>
              <Button
                title="Clear All Notifications"
                onPress={resetDemo}
                variant="secondary"
              />
              
              <View style={tw`mt-3`}>
                <Button
                  title="Show Event Information"
                  onPress={() => notifications.eventDetails()}
                  variant="outline"
                />
              </View>
            </View>
          </WineVisionCard>

          {/* Instructions */}
          <WineVisionCard variant="default" style={tw`mb-6`}>
            <WineVisionText variant="heading" size="lg" style={tw`mb-4`}>
              📋 How to Use
            </WineVisionText>
            
            <WineVisionText variant="body" style={tw`mb-2`}>
              • Select a user type (Exhibitor, Buyer, or Visitor)
            </WineVisionText>
            <WineVisionText variant="body" style={tw`mb-2`}>
              • Test different notification types using the buttons above
            </WineVisionText>
            <WineVisionText variant="body" style={tw`mb-2`}>
              • Notifications appear in the message bar below the header
            </WineVisionText>
            <WineVisionText variant="body">
              • Each user type has different step configurations and messages
            </WineVisionText>
          </WineVisionCard>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

RegistrationNotificationDemo.displayName = 'RegistrationNotificationDemo';
