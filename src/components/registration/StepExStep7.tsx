import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-7' (Company Details)
const StepExStep7: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Company Details</Text>
      <Text>Implement inputs for name, region, country, email, city, website, address, phone</Text>
    </View>
  );
};

export default StepExStep7;
