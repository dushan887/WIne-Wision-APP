import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Button, LoadingSpinner } from '../../components/common';

type LoginScreenNavigationProp = StackNavigationProp<any, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual login logic with Redux
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  if (loading) {
    return <LoadingSpinner text="Logging in..." />;
  }

  return (
    <View style={tw`flex-1 bg-white px-6 justify-center`}>
      <View style={tw`mb-8`}>
        <Text style={tw`text-3xl font-bold text-wine-800 text-center mb-2`}>
          Wine Vision
        </Text>
        <Text style={tw`text-gray-600 text-center`}>
          Welcome back! Please sign in to continue.
        </Text>
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Email</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-700 font-medium mb-2`}>Password</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Button
        title="Sign In"
        onPress={handleLogin}
        variant="primary"
        size="large"
        disabled={loading}
      />

      <View style={tw`mt-6 flex-row justify-center`}>
        <Text style={tw`text-gray-600`}>Don't have an account? </Text>
        <Button
          title="Sign Up"
          onPress={handleRegister}
          variant="outline"
          size="small"
        />
      </View>
    </View>
  );
};
