import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-3' (Reasons for Visiting)
const StepPbStep3: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Reasons for Visiting</Text>
      <Text>Implement multi-select component for reasons for visiting</Text>
    </View>
  );
};

export default StepPbStep3;
