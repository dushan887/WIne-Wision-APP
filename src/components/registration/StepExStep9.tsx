import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-9' (Social Media)
const StepExStep9: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Social Media</Text>
      <Text>Implement inputs for Instagram, LinkedIn, Facebook, and X handles</Text>
    </View>
  );
};

export default StepExStep9;
