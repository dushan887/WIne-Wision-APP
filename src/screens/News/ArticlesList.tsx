import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import { WineVisionColors } from '../../utils/wineVisionDesign';

const NewsScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-${WineVisionColors.carbon.primary} p-4`}>
      <Text style={tw`text-white text-2xl font-bold mb-4`}>News</Text>
      <View style={tw`bg-${WineVisionColors.carbon.light} p-4 rounded-lg mb-4`}>
        <Image source={{ uri: 'https://placehold.co/300x200?text=News+Image' }} style={tw`w-full h-40 mb-4`} />
        <Text style={tw`text-white text-xl mb-2`}>News Title 1</Text>
        <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Short description of the news article...</Text>
      </View>
      <View style={tw`bg-${WineVisionColors.carbon.light} p-4 rounded-lg`}>
        <Image source={{ uri: 'https://placehold.co/300x200?text=News+Image' }} style={tw`w-full h-40 mb-4`} />
        <Text style={tw`text-white text-xl mb-2`}>News Title 2</Text>
        <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Short description of the news article...</Text>
      </View>
    </ScrollView>
  );
};

export default NewsScreen;
