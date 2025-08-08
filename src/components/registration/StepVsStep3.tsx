import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-vs-step-3' (Personal Details - Visitor)
const StepVsStep3: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Personal Details</Text>
      <Text>Implement inputs for first name, last name, occupation, experience, nationality, email, position, phone, WhatsApp/Viber, company country & city</Text>
    </View>
  );
};

export default StepVsStep3;
