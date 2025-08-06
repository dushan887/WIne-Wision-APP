import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Card, UnreadBadge } from '../../components/common';
import { ExhibitorCard } from '../../components/dashboard';
import { InteractiveHall } from '../../components/svg';

type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleBoothPress = (boothId: string) => {
    console.log('Booth pressed:', boothId);
    // TODO: Navigate to booth details or exhibitor profile
  };

  const handleMenuPress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-4 py-6`}>
        {/* Welcome Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-bold text-wine-800 mb-2`}>
            Welcome to Wine Vision 2025
          </Text>
          <Text style={tw`text-gray-600`}>
            Discover exceptional wines and connect with industry professionals.
          </Text>
        </View>

        {/* Interactive Hall */}
        <Card variant="elevated">
          <Text style={tw`text-lg font-semibold mb-4 text-center`}>
            Exhibition Hall
          </Text>
          <InteractiveHall onBoothPress={handleBoothPress} />
          <Text style={tw`text-sm text-gray-600 text-center mt-2`}>
            Tap on booths to explore exhibitors
          </Text>
        </Card>

        {/* Quick Actions Menu */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Quick Actions</Text>
          
          <View style={tw`flex-row flex-wrap justify-between`}>
            <TouchableOpacity
              style={tw`w-[48%] mb-4`}
              onPress={() => handleMenuPress('News')}
            >
              <Card variant="outlined">
                <Text style={tw`font-semibold text-wine-700 mb-1`}>News</Text>
                <Text style={tw`text-sm text-gray-600`}>
                  Latest updates and articles
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-[48%] mb-4 relative`}
              onPress={() => handleMenuPress('Notifications')}
            >
              <Card variant="outlined">
                <UnreadBadge count={3} />
                <Text style={tw`font-semibold text-wine-700 mb-1`}>
                  Announcements
                </Text>
                <Text style={tw`text-sm text-gray-600`}>
                  Important notifications
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-[48%] mb-4`}
              onPress={() => handleMenuPress('Profile')}
            >
              <Card variant="outlined">
                <Text style={tw`font-semibold text-wine-700 mb-1`}>Profile</Text>
                <Text style={tw`text-sm text-gray-600`}>
                  Manage your account
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-[48%] mb-4`}
              onPress={() => handleMenuPress('ComingSoon')}
            >
              <Card variant="outlined">
                <Text style={tw`font-semibold text-wine-700 mb-1`}>Events</Text>
                <Text style={tw`text-sm text-gray-600`}>
                  Upcoming sessions
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Exhibitors */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-semibold mb-4`}>Featured Exhibitors</Text>
          
          <ExhibitorCard
            name="Vineyard Premium Wines"
            description="Discover our collection of award-winning wines from the finest vineyards across Europe."
            logo="https://via.placeholder.com/64"
            booth="A-12"
            category="Premium Wines"
            onPress={() => console.log('Exhibitor pressed')}
          />
          
          <ExhibitorCard
            name="Wine Tech Solutions"
            description="Innovative technology solutions for modern wine production and distribution."
            logo="https://via.placeholder.com/64"
            booth="B-08"
            category="Technology"
            onPress={() => console.log('Exhibitor pressed')}
          />
        </View>
      </View>
    </ScrollView>
  );
};
