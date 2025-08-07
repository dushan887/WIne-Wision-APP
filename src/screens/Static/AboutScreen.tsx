import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const AboutScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c]`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-white text-2xl font-bold mb-4`}>About Wine Vision 2025</Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Wine Vision is the premier international wine and spirits trade fair in Southeast Europe, 
          bringing together industry professionals, exhibitors, and wine enthusiasts from around the world.
        </Text>
        <Text style={tw`text-gray-300 text-base leading-6 mb-4`}>
          Join us November 22-25, 2025 at Belgrade Fair, Serbia for an unforgettable experience 
          showcasing the finest wines, spirits, and industry innovations.
        </Text>
        <Text style={tw`text-gray-300 text-base leading-6`}>
          Connect with industry leaders, discover new products, and expand your business network 
          at the region's most important wine industry event.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
