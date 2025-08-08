import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-1' (User Category)
const StepPbStep1: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>User Category</Text>
      <Text>Implement select for buyer categories (includes Other logic)</Text>
    </View>
  );
};

export default StepPbStep1;
