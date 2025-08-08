import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-3' (User Category)
const StepExStep3: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>User Category</Text>
      <Text>Implement select for user category (includes Other logic)</Text>
    </View>
  );
};

export default StepExStep3;
