import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { logoutUser } from '../../store/actions/userActions';
import { AppDispatch } from '../../store';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logoutUser());
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.c }]}>
      <ScrollView style={tw`flex-1`}>
        {/* Profile Header */}
        <View style={tw`items-center p-8`}>
          <Image source={{ uri: 'https://placehold.co/120?text=Avatar' }} style={tw`w-30 h-30 rounded-full mb-4`} />
          <Text style={[tw`text-2xl font-bold`, { color: colors.c_20 }]}>John Doe</Text>
          <Text style={[tw``, { color: colors.c_50 }]}>john.doe@example.com</Text>
        </View>

        {/* Profile Info */}
        <View style={tw`p-4`}>
          <Text style={[tw`text-xl mb-2`, { color: colors.c_20 }]}>Personal Information</Text>
          <Text style={[tw``, { color: colors.c_50 }]}>Name: John Doe</Text>
          <Text style={[tw``, { color: colors.c_50 }]}>Email: john.doe@example.com</Text>
          <Text style={[tw``, { color: colors.c_50 }]}>Phone: +1 234 567 890</Text>
        </View>

        <TouchableOpacity 
          style={[tw`mx-4 my-2 p-4 rounded-lg`, { backgroundColor: colors.v }]}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={[tw`text-center`, { color: colors.c_20 }]}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[tw`mx-4 my-2 p-4 rounded-lg`, { backgroundColor: colors.r }]}
          onPress={handleLogout}
        >
          <Text style={[tw`text-center font-bold`, { color: colors.c_20 }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;