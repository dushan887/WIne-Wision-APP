import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/actions/userActions';
import { RootState, AppDispatch } from '../../store';
import { WineVisionColors } from '../../utils/wineVisionDesign';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);
  
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 890');

  const handleSave = async () => {
    try {
      await dispatch(updateProfile({
        display_name: name,
        user_email: email,
        phone: phone,
      })).unwrap();
      
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to update profile');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-${WineVisionColors.carbon.primary} p-4`}>
      <Text style={tw`text-white text-xl mb-4`}>Edit Profile</Text>

      <Text style={tw`text-${WineVisionColors.carbon.muted} mb-2`}>Name</Text>
      <TextInput 
        style={tw`bg-${WineVisionColors.carbon.light} text-white p-4 rounded-lg mb-4`} 
        value={name} 
        onChangeText={setName} 
      />

      <Text style={tw`text-${WineVisionColors.carbon.muted} mb-2`}>Email</Text>
      <TextInput 
        style={tw`bg-${WineVisionColors.carbon.light} text-white p-4 rounded-lg mb-4`} 
        value={email} 
        onChangeText={setEmail} 
      />

      <Text style={tw`text-${WineVisionColors.carbon.muted} mb-2`}>Phone</Text>
      <TextInput 
        style={tw`bg-${WineVisionColors.carbon.light} text-white p-4 rounded-lg mb-8`} 
        value={phone} 
        onChangeText={setPhone} 
      />

      <TouchableOpacity 
        style={tw`bg-purple-600 p-4 rounded-lg ${loading ? 'opacity-50' : ''}`}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={tw`text-white text-center font-bold`}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;
