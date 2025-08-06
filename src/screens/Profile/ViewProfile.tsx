import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Button, Card } from '../../components/common';

type ProfileScreenNavigationProp = StackNavigationProp<any, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // TODO: Get user data from Redux store
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Wine Enthusiasts LLC',
    position: 'Wine Consultant',
    role: 'Visitor',
    avatar: 'https://via.placeholder.com/120',
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-4 py-6`}>
        {/* Profile Header */}
        <Card variant="elevated">
          <View style={tw`items-center`}>
            <Image
              source={{ uri: userData.avatar }}
              style={tw`w-24 h-24 rounded-full mb-4`}
            />
            <Text style={tw`text-2xl font-bold text-wine-800 mb-1`}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text style={tw`text-wine-600 font-medium mb-2`}>
              {userData.role}
            </Text>
            <Text style={tw`text-gray-600 text-center`}>
              {userData.company}
            </Text>
          </View>
        </Card>

        {/* Contact Information */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Contact Information</Text>
          
          <Card variant="outlined">
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 text-sm mb-1`}>Email</Text>
              <Text style={tw`text-gray-900 font-medium`}>{userData.email}</Text>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 text-sm mb-1`}>Phone</Text>
              <Text style={tw`text-gray-900 font-medium`}>{userData.phone}</Text>
            </View>
            
            <View>
              <Text style={tw`text-gray-600 text-sm mb-1`}>Position</Text>
              <Text style={tw`text-gray-900 font-medium`}>{userData.position}</Text>
            </View>
          </Card>
        </View>

        {/* Actions */}
        <View style={tw`mt-6 space-y-4`}>
          <Button
            title="Edit Profile"
            onPress={handleEditProfile}
            variant="primary"
            size="large"
          />
          
          <View style={tw`mt-4`}>
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              size="large"
            />
          </View>
        </View>

        {/* Additional Information */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Event Details</Text>
          
          <Card variant="outlined">
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 text-sm mb-1`}>Registration Date</Text>
              <Text style={tw`text-gray-900 font-medium`}>January 15, 2025</Text>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-600 text-sm mb-1`}>Ticket Type</Text>
              <Text style={tw`text-gray-900 font-medium`}>Professional Access</Text>
            </View>
            
            <View>
              <Text style={tw`text-gray-600 text-sm mb-1`}>Badge ID</Text>
              <Text style={tw`text-gray-900 font-medium`}>WV2025-12345</Text>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};
