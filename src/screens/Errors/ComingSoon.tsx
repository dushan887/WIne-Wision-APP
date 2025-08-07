import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const ComingSoonScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-[#0b051c] justify-center items-center p-8`}>
      <Image source={{ uri: 'https://placehold.co/200?text=Coming+Soon' }} style={tw`w-50 h-50 mb-8`} />
      <Text style={tw`text-white text-3xl font-bold mb-4`}>Coming Soon</Text>
      <Text style={tw`text-gray-300 text-center mb-8`}>This feature is under development. Stay tuned!</Text>
      <TouchableOpacity 
        style={tw`bg-purple-600 p-4 rounded-lg`}
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`text-white font-bold`}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComingSoonScreen;
