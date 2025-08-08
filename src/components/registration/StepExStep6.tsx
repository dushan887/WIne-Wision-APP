import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-6' (Company Description)
const StepExStep6: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Company Description</Text>
      <Text>Implement textarea for company description</Text>
    </View>
  );
};

export default StepExStep6;
