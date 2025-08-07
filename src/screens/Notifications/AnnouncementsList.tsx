import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const NotificationsScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c] p-4`}>
      <Text style={tw`text-white text-2xl font-bold mb-4`}>Notifications</Text>
      <View style={tw`bg-gray-800 p-4 rounded-lg mb-4`}>
        <Text style={tw`text-white text-xl mb-2`}>Announcement 1</Text>
        <Text style={tw`text-gray-300`}>Details about the announcement...</Text>
      </View>
      <View style={tw`bg-gray-800 p-4 rounded-lg`}>
        <Text style={tw`text-white text-xl mb-2`}>Announcement 2</Text>
        <Text style={tw`text-gray-300`}>Details about the announcement...</Text>
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;
