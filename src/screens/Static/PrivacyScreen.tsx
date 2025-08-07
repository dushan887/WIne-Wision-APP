import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const PrivacyScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c]`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-white text-2xl font-bold mb-6`}>Privacy Policy</Text>
        
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Last updated: November 2024
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Data Collection</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          We collect personal information you provide when registering for Wine Vision 2025, 
          including name, email, company details, and professional information necessary for 
          event participation and networking.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Data Usage</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Your information is used to facilitate event participation, enable networking features, 
          send event updates, and improve our services. We do not sell your personal data to third parties.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Data Security</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          We implement appropriate security measures to protect your personal information against 
          unauthorized access, alteration, disclosure, or destruction.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Your Rights</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          You have the right to access, update, or delete your personal information. 
          Contact us at privacy@winevision.rs for data-related requests.
        </Text>

        <Text style={tw`text-white text-lg font-semibold mb-3`}>Contact</Text>
        <Text style={tw`text-gray-300 text-base leading-6`}>
          For privacy-related questions, contact us at privacy@winevision.rs
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyScreen;
