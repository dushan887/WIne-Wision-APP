import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export const TailwindColorTest = () => {
  return (
    <View style={tw`p-4 bg-white`}>
      <Text style={tw`text-red-500 text-lg font-bold mb-2`}>
        Red Text (Built-in Color)
      </Text>
      <Text style={tw`text-blue-600 text-lg font-bold mb-2`}>
        Blue Text (Built-in Color)
      </Text>
      <Text style={tw`text-green-700 text-lg font-bold mb-2`}>
        Green Text (Built-in Color)
      </Text>
      <Text style={tw`text-c text-lg font-bold mb-2`}>
        Carbon Text (Custom Color c)
      </Text>
      <Text style={tw`text-v text-lg font-bold mb-2`}>
        Velvet Text (Custom Color v)
      </Text>
      <Text style={tw`text-w text-lg font-bold mb-2`}>
        White Text (Custom Color w)
      </Text>
      <View style={tw`bg-c p-4 mt-4`}>
        <Text style={tw`text-w`}>White text on carbon background</Text>
      </View>
    </View>
  );
};
