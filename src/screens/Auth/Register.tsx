import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { registerUser } from '../../store/actions/userActions';
import { RootState, AppDispatch } from '../../store';

// Generic navigation prop to allow navigation to any app screen
type NavigationProp = StackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Profile') }
      ]);
    } catch (error: any) {
      Alert.alert('Registration Failed', error || 'Please try again');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c] p-4`}>
      <Text style={tw`text-white text-2xl font-bold mb-6 text-center`}>Create Account</Text>
      
      <Text style={tw`text-gray-300 mb-2`}>Username *</Text>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-4 rounded-lg mb-4`}
        placeholder="Enter username"
        placeholderTextColor="gray"
        value={formData.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />

      <Text style={tw`text-gray-300 mb-2`}>Email *</Text>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-4 rounded-lg mb-4`}
        placeholder="Enter email"
        placeholderTextColor="gray"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType="email-address"
      />

      <Text style={tw`text-gray-300 mb-2`}>First Name</Text>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-4 rounded-lg mb-4`}
        placeholder="Enter first name"
        placeholderTextColor="gray"
        value={formData.first_name}
        onChangeText={(value) => handleInputChange('first_name', value)}
      />

      <Text style={tw`text-gray-300 mb-2`}>Last Name</Text>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-4 rounded-lg mb-4`}
        placeholder="Enter last name"
        placeholderTextColor="gray"
        value={formData.last_name}
        onChangeText={(value) => handleInputChange('last_name', value)}
      />

      <Text style={tw`text-gray-300 mb-2`}>Password *</Text>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-4 rounded-lg mb-4`}
        placeholder="Enter password"
        placeholderTextColor="gray"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
      />

      <Text style={tw`text-gray-300 mb-2`}>Confirm Password *</Text>
      <TextInput
        style={tw`w-full bg-gray-800 text-white p-4 rounded-lg mb-6`}
        placeholder="Confirm password"
        placeholderTextColor="gray"
        value={formData.confirmPassword}
        onChangeText={(value) => handleInputChange('confirmPassword', value)}
        secureTextEntry
      />

      <TouchableOpacity 
        style={tw`w-full bg-purple-600 p-4 rounded-lg mb-4 ${loading ? 'opacity-50' : ''}`}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={tw`text-white text-center font-bold`}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-gray-400 text-center`}>
          Already have an account?{' '}
          <Text style={tw`text-purple-400 font-bold`}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;