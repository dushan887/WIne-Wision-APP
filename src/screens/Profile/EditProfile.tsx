import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Button, LoadingSpinner } from '../../components/common';

type EditProfileScreenNavigationProp = StackNavigationProp<any, 'EditProfile'>;

interface Props {
  navigation: EditProfileScreenNavigationProp;
}

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Wine Enthusiasts LLC',
    position: 'Wine Consultant',
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement save logic with Redux
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <LoadingSpinner text="Updating profile..." />;
  }

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-xl font-bold text-wine-800 mb-6`}>
          Edit Profile Information
        </Text>

        {/* Personal Information */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Personal Information</Text>
          
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>First Name</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
              value={formData.firstName}
              onChangeText={(value) => updateField('firstName', value)}
              placeholder="Enter your first name"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Last Name</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
              value={formData.lastName}
              onChangeText={(value) => updateField('lastName', value)}
              placeholder="Enter your last name"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Email</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Phone</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Professional Information */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Professional Information</Text>
          
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Company</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
              value={formData.company}
              onChangeText={(value) => updateField('company', value)}
              placeholder="Enter your company name"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Position</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base`}
              value={formData.position}
              onChangeText={(value) => updateField('position', value)}
              placeholder="Enter your position"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={tw`flex-row justify-between mt-8 mb-6`}>
          <Button
            title="Cancel"
            onPress={handleCancel}
            variant="outline"
            size="medium"
          />
          <Button
            title="Save Changes"
            onPress={handleSave}
            variant="primary"
            size="medium"
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
};
