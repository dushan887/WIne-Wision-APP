import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-pb-step-10' (Personal Details)
const StepPbStep10: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Personal Details</Text>
      <Text>Implement inputs for first name, last name, nationality, email, contact telephone, and social preferences</Text>
    </View>
  );
};

export default StepPbStep10;
