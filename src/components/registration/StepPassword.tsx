import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
import { getProfileTheme } from '../../utils/profileTheming';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPasswordProps {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

const StepPassword: React.FC<StepPasswordProps> = ({ 
  savedData, 
  onUpdateData, 
  onNext, 
  headerTitle, 
  headerSubtitle 
}) => {
  const [password, setPassword] = useState(savedData?.wv_user_password || '');
  const [confirmPassword, setConfirmPassword] = useState(savedData?.wv_password_confirm || '');
  const [termsAccepted, setTermsAccepted] = useState(savedData?.terms_conditions || false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get the current profile theme - memoized to prevent unnecessary recalculations
  const profileTheme = useMemo(() => {
    return getProfileTheme(savedData?.wv_profileSelection || null);
  }, [savedData?.wv_profileSelection]);
  const role = savedData?.wv_profileSelection || '';

  // Password validation - memoized for performance
  const validatePassword = useCallback((pwd: string) => {
    const minLength = pwd.length >= 10;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    return minLength && hasUpperCase && hasNumbers;
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    onUpdateData?.({ wv_user_password: value });
  }, [onUpdateData]);

  const handleConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
    onUpdateData?.({ wv_password_confirm: value });
  }, [onUpdateData]);

  const handleTermsChange = useCallback((value: boolean) => {
    setTermsAccepted(value);
    onUpdateData?.({ terms_conditions: value });
  }, [onUpdateData]);

  const isPasswordValid = useMemo(() => validatePassword(password), [validatePassword, password]);
  const doPasswordsMatch = useMemo(() => 
    password === confirmPassword && password.length > 0, 
    [password, confirmPassword]
  );

  return (
    <ScrollView style={tw`flex-1`}>
      <View style={tw`px-6 pb-6`}>
        {/* Header */}
        <StepHeader title={headerTitle || ''} subtitle={headerSubtitle || ''} />
        
        {/* Form Container */}
        <View style={[
          tw`p-6 rounded-lg`,
          { backgroundColor: profileTheme.selectionColors.primary + '50' }
        ]}>
          {/* Password Field */}
          <View style={[
            tw`pb-4 mb-4`,
            role === 'Exhibitor' ? { borderBottomWidth: 1, borderBottomColor: colors.w } : {}
          ]}>
            <Text style={[
              tw`text-sm font-medium mb-2`,
              { color: colors.w }
            ]}>
              Password*
            </Text>
            
            <View style={tw`relative`}>
              <TextInput
                style={[
                  tw`border rounded-lg px-4 pr-12 text-base`,
                  { 
                    height: 48,
                    lineHeight: 20,
                    textAlignVertical: 'center',
                    borderColor: (password.length > 0 && !isPasswordValid) ? colors.r : colors.w,
                    backgroundColor: colors.w,
                    color: colors.c
                  }
                ]}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.c_50}
              />
              
              <TouchableOpacity
                style={[
                  tw`absolute right-4 top-0 bottom-0 justify-center`
                ]}
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Text style={[
                  tw`text-lg`,
                  { 
                    fontFamily: 'Wine-Vision',
                    color: colors.c_50
                  }
                ]}>
                  {showPassword ? '\ue94c' : '\ue95c'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[
              tw`text-xs mt-1`,
              { color: colors.w }
            ]}>
              Minimum 10 characters with capital letters and numbers
            </Text>
          </View>

          {/* Confirm Password Field */}
          <View style={[
            tw`pb-4`,
            role === 'Exhibitor' ? { 
              borderBottomWidth: 1, 
              borderBottomColor: colors.w,
              marginBottom: 16
            } : { marginBottom: 16 }
          ]}>
            <Text style={[
              tw`text-sm font-medium mb-2`,
              { color: colors.w }
            ]}>
              Confirm password*
            </Text>
            
            <View style={tw`relative`}>
              <TextInput
                style={[
                  tw`border rounded-lg px-4 pr-12 text-base`,
                  { 
                    height: 48,
                    lineHeight: 20,
                    textAlignVertical: 'center',
                    borderColor: (confirmPassword.length > 0 && !doPasswordsMatch) ? colors.r : colors.w,
                    backgroundColor: colors.w,
                    color: colors.c
                  }
                ]}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry={!showConfirmPassword}
                placeholder="Re-enter your password"
                placeholderTextColor={colors.c_50}
              />
              
              <TouchableOpacity
                style={[
                  tw`absolute right-4 top-0 bottom-0 justify-center`
                ]}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Text style={[
                  tw`text-lg`,
                  { 
                    fontFamily: 'Wine-Vision',
                    color: colors.c_50
                  }
                ]}>
                  {showConfirmPassword ? '\ue94c' : '\ue95c'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[
              tw`text-xs mt-1`,
              { color: colors.w }
            ]}>
              Re-type your password
            </Text>
          </View>

          {/* Terms & Conditions - Only for Exhibitors */}
          {role === 'Exhibitor' && (
            <View style={tw`mt-3`}>
              <Text style={[
                tw`text-xs mb-4 leading-4`,
                { color: colors.w }
              ]}>
                By submitting your personal information, you have consented to the collection, storage, and use of this data. Your information will be used solely for the purposes of communication, registration, and providing relevant updates. We are committed to protecting your privacy and will not share your data with third parties without your explicit consent, except as required by law. For more details, please review our Privacy Policy. By creating an account, you have consented to participate in the 2025 Business Meetings Program. Wine Vision by Open Balkan Fair reserves all rights to evaluate, approve, or decline any submitted participant account, based on its assessment. If a participant does not pass the evaluation, Wine Vision by Open Balkan Fair is legally obligated to remove all data provided by the participant during registration and will not retain or utilize it in the future.
              </Text>
              
              <TouchableOpacity
                style={tw`flex-row items-center`}
                onPress={() => handleTermsChange(!termsAccepted)}
              >
                <View style={[
                  tw`w-5 h-5 rounded border-2 mr-3 items-center justify-center`,
                  { 
                    borderColor: colors.w,
                    backgroundColor: termsAccepted ? profileTheme.selectionColors.primary : 'transparent'
                  }
                ]}>
                  {termsAccepted && (
                    <Text style={[
                      tw`text-xs font-bold`,
                      { color: colors.w }
                    ]}>
                      ✓
                    </Text>
                  )}
                </View>
                
                <Text style={[
                  tw`text-sm flex-1`,
                  { color: colors.w }
                ]}>
                  I have read these terms and I fully accept them.
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StepPassword;
