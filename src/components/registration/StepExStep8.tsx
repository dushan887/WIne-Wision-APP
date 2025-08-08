import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-8' (Financial Details)
const StepExStep8: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Financial Details</Text>
      <Text>Implement inputs for VAT number and optional financial fields</Text>
    </View>
  );
};

export default StepExStep8;
