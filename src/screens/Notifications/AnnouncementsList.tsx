import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { WineVisionColors } from '../../utils/wineVisionDesign';

const NotificationsScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-${WineVisionColors.carbon.primary} p-4`}>
      <Text style={tw`text-white text-2xl font-bold mb-4`}>Notifications</Text>
      <View style={tw`bg-${WineVisionColors.carbon.light} p-4 rounded-lg mb-4`}>
        <Text style={tw`text-white text-xl mb-2`}>Announcement 1</Text>
        <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Details about the announcement...</Text>
      </View>
      <View style={tw`bg-${WineVisionColors.carbon.light} p-4 rounded-lg`}>
        <Text style={tw`text-white text-xl mb-2`}>Announcement 2</Text>
        <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Details about the announcement...</Text>
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;
