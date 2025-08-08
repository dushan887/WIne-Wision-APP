import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-9' (Social Media)
const StepPbStep9: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Social Media</Text>
      <Text>Implement inputs for social media links</Text>
    </View>
  );
};

export default StepPbStep9;
