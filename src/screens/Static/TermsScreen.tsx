import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

const TermsScreen = () => {
  return (
    <ScrollView style={[tw`flex-1 px-6 py-8`, { backgroundColor: colors.c }]}>
      <View style={tw`p-6`}>
        <Text style={[tw`text-2xl font-bold mb-6`, { color: colors.w }]}>Terms of Service</Text>
        
        <Text style={[tw`text-base leading-6 mb-4`, { color: colors.c_50 }]}>
          Last updated: November 2024
        </Text>

        <Text style={[tw`text-lg font-semibold mb-3`, { color: colors.w }]}>Acceptance of Terms</Text>
        <Text style={[tw`text-base leading-6 mb-4`, { color: colors.c_50 }]}>
          By using the Wine Vision 2025 app and participating in our events, 
          you agree to comply with these terms of service.
        </Text>

        <Text style={[tw`text-lg font-semibold mb-3`, { color: colors.w }]}>Event Participation</Text>
        <Text style={[tw`text-base leading-6 mb-4`, { color: colors.c_50 }]}>
          Participation in Wine Vision 2025 requires valid registration and compliance 
          with event rules and professional conduct standards.
        </Text>

        <Text style={[tw`text-lg font-semibold mb-3`, { color: colors.w }]}>App Usage</Text>
        <Text style={[tw`text-base leading-6 mb-4`, { color: colors.c_50 }]}>
          The Wine Vision app is provided for event-related activities including networking, 
          scheduling meetings, and accessing event information. Misuse of the app may result 
          in account suspension.
        </Text>

        <Text style={[tw`text-lg font-semibold mb-3`, { color: colors.w }]}>Intellectual Property</Text>
        <Text style={[tw`text-base leading-6 mb-4`, { color: colors.c_50 }]}>
          All content, trademarks, and materials related to Wine Vision are protected 
          by intellectual property rights and may not be used without permission.
        </Text>

        <Text style={[tw`text-lg font-semibold mb-3`, { color: colors.w }]}>Liability</Text>
        <Text style={[tw`text-base leading-6 mb-4`, { color: colors.c_50 }]}>
          Wine Vision organizers are not liable for any direct or indirect damages 
          arising from event participation or app usage.
        </Text>

        <Text style={[tw`text-lg font-semibold mb-3`, { color: colors.w }]}>Contact</Text>
        <Text style={[tw`text-base leading-6`, { color: colors.c_50 }]}>
          For questions about these terms, contact us at legal@winevision.rs
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsScreen;
