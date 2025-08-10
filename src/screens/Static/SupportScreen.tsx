import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { WineVisionColors } from '../../utils/wineVisionDesign';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

const SupportScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@winevision.rs');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+381114028888');
  };

  return (
    <ScrollView style={[tw`flex-1 px-6 py-8`, { backgroundColor: colors.c }]}>
      <View style={tw`p-6`}>
        <Text style={[tw`text-2xl font-bold mb-6`, { color: colors.w }]}>Support</Text>
        
        <Text style={[tw`text-base leading-6 mb-6`, { color: colors.c_50 }]}>
          Need help with the Wine Vision app or have questions about the event? 
          We're here to assist you.
        </Text>

        {/* Contact Support */}
        <TouchableOpacity 
          style={[tw`flex-row items-center mb-4 p-4 rounded-lg`, { backgroundColor: colors.c_80 }]}
          onPress={handleEmailPress}
        >
          <Ionicons name="mail-outline" size={24} color={colors.v} style={tw`mr-3`} />
          <View>
            <Text style={[tw`text-lg font-semibold`, { color: colors.w }]}>Email Support</Text>
            <Text style={[{ color: colors.c_50 }]}>support@winevision.rs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[tw`flex-row items-center mb-6 p-4 rounded-lg`, { backgroundColor: colors.c_80 }]}
          onPress={handlePhonePress}
        >
          <Ionicons name="call-outline" size={24} color={colors.v} style={tw`mr-3`} />
          <View>
            <Text style={[tw`text-lg font-semibold`, { color: colors.w }]}>Phone Support</Text>
            <Text style={[{ color: colors.c_50 }]}>+381 11 40 28 888</Text>
          </View>
        </TouchableOpacity>

        {/* Common Issues */}
        <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>Common Issues</Text>
        
        <View style={[tw`mb-4 p-4 rounded-lg`, { backgroundColor: colors.c_80 }]}>
          <Text style={[tw`text-base font-medium mb-2`, { color: colors.w }]}>Login Problems</Text>
          <Text style={[tw`text-sm`, { color: colors.c_50 }]}>
            If you can't log in, try resetting your password or contact support with your registration email.
          </Text>
        </View>

        <View style={[tw`mb-4 p-4 rounded-lg`, { backgroundColor: colors.c_80 }]}>
          <Text style={[tw`text-base font-medium mb-2`, { color: colors.w }]}>Meeting Scheduling</Text>
          <Text style={[tw`text-sm`, { color: colors.c_50 }]}>
            Use the 'Meeting Requests' feature to connect with exhibitors and schedule appointments.
          </Text>
        </View>

        <View style={[tw`mb-4 p-4 rounded-lg`, { backgroundColor: colors.c_80 }]}>
          <Text style={[tw`text-base font-medium mb-2`, { color: colors.w }]}>Profile Updates</Text>
          <Text style={[tw`text-sm`, { color: colors.c_50 }]}>
            Update your profile information in the Profile section to ensure accurate networking.
          </Text>
        </View>

        <Text style={[tw`text-sm text-center mt-6`, { color: colors.c_50 }]}>
          Support hours: Monday-Friday, 9:00-17:00 CET
        </Text>
      </View>
    </ScrollView>
  );
};

export default SupportScreen;
