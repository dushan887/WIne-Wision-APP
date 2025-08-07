import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { loginUser } from '../../store/actions/userActions';
import { RootState, AppDispatch } from '../../store';
import HeaderLogoLight from '../../../assets/images/Header_Logo_Info_LIGHT.svg';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    'Wine-Vision': require('../../../assets/fonts/wv-icons/Wine-Vision.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: colors.c }]}>
        <Text style={{ color: colors.c_20 }}>Loading...</Text>
      </View>
    );
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigation.navigate('Profile');
    } catch (error: any) {
      Alert.alert('Login Failed', error || 'Please check your credentials');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: colors.c }]}>
      <View style={tw`flex-1 justify-start items-center px-8 pt-20`}>
        {/* Wine Vision Logo */}
        <HeaderLogoLight width={240} height={80} style={tw`mb-8`} />

        {/* Login Form with Gradient Frame */}
        <LinearGradient
          colors={[colors.c_90, colors.c]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={tw`w-full max-w-sm rounded-t-3xl p-6`}
        >
          <TextInput
            style={[tw`w-full p-4 rounded-lg mb-4`, { backgroundColor: colors.c, color: colors.c_20 }]}
            placeholder="E-mail or Phone Number"
            placeholderTextColor={colors.c_20}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={tw`relative mb-6`}>
            <TextInput
              style={[tw`w-full p-4 rounded-lg pr-12`, { backgroundColor: colors.c, color: colors.c_20 }]}
              placeholder="Password"
              placeholderTextColor={colors.c_20}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={tw`absolute right-4 top-0 bottom-0 justify-center`}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={[tw`text-lg`, { fontFamily: 'Wine-Vision', color: colors.c_20 }]}>
                {showPassword ? '\ue94c' : '\ue95c'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={tw`w-full rounded-lg mb-6 ${loading ? 'opacity-50' : ''}`}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={[colors.y, colors.r, colors.v]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`p-4 rounded-lg`}
            >
              <Text style={[tw`text-center font-bold text-lg`, { color: colors.c_20 }]}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[tw`text-center`, { color: colors.c_20 }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default LoginScreen;
