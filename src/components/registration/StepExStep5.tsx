import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-5' (Exhibiting Products)
const StepExStep5: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Exhibiting Products</Text>
      <Text>Implement select for Yes or No</Text>
    </View>
  );
};

export default StepExStep5;
