import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { WineVisionColors } from '../../utils/wineVisionDesign';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ScrollView style={tw`flex-1 bg-${WineVisionColors.carbon.primary}`}>
      {/* Header with time */}
      <View style={tw`p-4 bg-${WineVisionColors.velvet.primary}`}>
        <Text style={tw`text-white text-2xl font-bold`}>Welcome, John</Text>
        <Text style={tw`text-${WineVisionColors.carbon.muted}`}>13:30</Text>
      </View>

      {/* Application Status */}
      <View style={tw`p-4`}>
        <Text style={tw`text-white text-xl mb-2`}>Application Form Status</Text>
        <Text style={tw`text-red-500`}>Incomplete</Text>
      </View>

      {/* Quick Actions */}
      <View style={tw`flex-row justify-around p-4`}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: 'https://placehold.co/60?text=Profile' }} style={tw`w-15 h-15`} />
          <Text style={tw`text-white text-center`}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Image source={{ uri: 'https://placehold.co/60?text=Notifications' }} style={tw`w-15 h-15`} />
          <Text style={tw`text-white text-center`}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <Image source={{ uri: 'https://placehold.co/60?text=News' }} style={tw`w-15 h-15`} />
          <Text style={tw`text-white text-center`}>News</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Content */}
      <View style={tw`p-4`}>
        <Text style={tw`text-white text-xl mb-4`}>Discover Wine Vision</Text>
        <Image source={{ uri: 'https://placehold.co/300x200?text=Welcome+Image' }} style={tw`w-full h-50 mb-4`} />
        <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Explore our events, connect with exhibitors, and more.</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
