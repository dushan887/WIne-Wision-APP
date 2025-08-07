import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const TermsScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c]`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-white text-2xl font-bold mb-6`}>Terms of Service</Text>
        
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Last updated: November 2024
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Acceptance of Terms</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          By using the Wine Vision 2025 app and participating in our events, 
          you agree to comply with these terms of service.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Event Participation</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Participation in Wine Vision 2025 requires valid registration and compliance 
          with event rules and professional conduct standards.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>App Usage</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          The Wine Vision app is provided for event-related activities including networking, 
          scheduling meetings, and accessing event information. Misuse of the app may result 
          in account suspension.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Intellectual Property</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          All content, trademarks, and materials related to Wine Vision are protected 
          by intellectual property rights and may not be used without permission.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Liability</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Wine Vision organizers are not liable for any direct or indirect damages 
          arising from event participation or app usage.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Contact</Text>
        <Text style={tw`text-gray-300 text-base leading-6`}>
          For questions about these terms, contact us at legal@winevision.rs
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsScreen;
