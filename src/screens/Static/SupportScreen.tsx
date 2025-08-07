import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@winevision.rs');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+381114028888');
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c]`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-white text-2xl font-bold mb-6`}>Support</Text>
        
        <Text style={tw`text-gray-300 text-base leading-6 mb-6`}>
          Need help with the Wine Vision app or have questions about the event? 
          We're here to assist you.
        </Text>

        {/* Contact Support */}
        <TouchableOpacity 
          style={tw`flex-row items-center mb-4 p-4 bg-gray-800 rounded-lg`}
          onPress={handleEmailPress}
        >
          <Ionicons name="mail-outline" size={24} color="#6e0fd7" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Email Support</Text>
            <Text style={tw`text-gray-300`}>support@winevision.rs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`flex-row items-center mb-6 p-4 bg-gray-800 rounded-lg`}
          onPress={handlePhonePress}
        >
          <Ionicons name="call-outline" size={24} color="#6e0fd7" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Phone Support</Text>
            <Text style={tw`text-gray-300`}>+381 11 40 28 888</Text>
          </View>
        </TouchableOpacity>

        {/* Common Issues */}
        <Text style={tw`text-white text-lg font-semibold mb-4`}>Common Issues</Text>
        
        <View style={tw`mb-4 p-4 bg-gray-800 rounded-lg`}>
          <Text style={tw`text-white text-base font-medium mb-2`}>Login Problems</Text>
          <Text style={tw`text-gray-300 text-sm`}>
            If you can't log in, try resetting your password or contact support with your registration email.
          </Text>
        </View>

        <View style={tw`mb-4 p-4 bg-gray-800 rounded-lg`}>
          <Text style={tw`text-white text-base font-medium mb-2`}>Meeting Scheduling</Text>
          <Text style={tw`text-gray-300 text-sm`}>
            Use the 'Meeting Requests' feature to connect with exhibitors and schedule appointments.
          </Text>
        </View>

        <View style={tw`mb-4 p-4 bg-gray-800 rounded-lg`}>
          <Text style={tw`text-white text-base font-medium mb-2`}>Profile Updates</Text>
          <Text style={tw`text-gray-300 text-sm`}>
            Update your profile information in the Profile section to ensure accurate networking.
          </Text>
        </View>

        <Text style={tw`text-gray-300 text-sm text-center mt-6`}>
          Support hours: Monday-Friday, 9:00-17:00 CET
        </Text>
      </View>
    </ScrollView>
  );
};

export default SupportScreen;
