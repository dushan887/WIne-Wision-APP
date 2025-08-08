import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Step component for 'wv-ex-step-2' (Participation Model)
const StepExStep2: React.FC = () => {
  return (
    <View style={tw`px-6 py-4`}>  
      <Text style={tw`text-lg font-bold mb-4`}>Participation Model</Text>
      <Text>Implement select for Solo Exhibitor, Head Exhibitor, or Co-Exhibitor</Text>
    </View>
  );
};

export default StepExStep2;
