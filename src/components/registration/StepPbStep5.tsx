import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-5' (Points of Interest)
const StepPbStep5: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Points of Interest</Text>
      <Text>Implement multi-select component for points of interest</Text>
    </View>
  );
};

export default StepPbStep5;
