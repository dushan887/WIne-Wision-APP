import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-8' (Reason for Applying)
const StepPbStep8: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Reason for Applying</Text>
      <Text>Implement textarea for reason for applying</Text>
    </View>
  );
};

export default StepPbStep8;
