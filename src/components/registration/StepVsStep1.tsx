import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-vs-step-1' (Participation Model)
const StepVsStep1: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Participation Model</Text>
      <Text>Implement select for Public Visitor or Company</Text>
    </View>
  );
};

export default StepVsStep1;
