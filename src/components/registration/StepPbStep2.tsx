import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-2' (Category Description)
const StepPbStep2: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Category Description</Text>
      <Text>Implement textarea for category description when 'Other' is selected</Text>
    </View>
  );
};

export default StepPbStep2;
