import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Card, UnreadBadge } from '../../components/common';
import { ExhibitorCard } from '../../components/dashboard';
import { InteractiveHall } from '../../components/svg';
import { WineVisionStyles } from '../../utils/wineVisionDesign';

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
    <ScrollView style={tw`flex-1 bg-c_5`}>
      <View style={tw`px-20 py-24`}>
        {/* Welcome Section */}
        <View style={tw`mb-24`}>
          <Text style={[tw`mb-8`, WineVisionStyles.h1]}>
            Welcome to Wine Vision 2025
          </Text>
          <Text style={WineVisionStyles.body}>
            Discover exceptional wines and connect with industry professionals.
          </Text>
        </View>

        {/* Interactive Hall */}
        <Card variant="elevated">
          <Text style={[tw`text-center mb-16`, WineVisionStyles.h3]}>
            Exhibition Hall
          </Text>
          <InteractiveHall onBoothPress={handleBoothPress} />
          <Text style={[tw`text-center mt-8`, WineVisionStyles.caption]}>
            Tap on booths to explore exhibitors
          </Text>
        </Card>

        {/* Quick Actions Menu */}
        <View style={tw`mt-24`}>
          <Text style={[tw`mb-16`, WineVisionStyles.h3]}>Quick Actions</Text>
          
          <View style={tw`flex-row flex-wrap justify-between`}>
            <TouchableOpacity
              style={tw`w-48% mb-16`}
              onPress={() => handleMenuPress('News')}
            >
              <Card variant="outlined">
                <Text style={[tw`mb-4`, WineVisionStyles.cardHeader]}>News</Text>
                <Text style={WineVisionStyles.bodySmall}>
                  Latest updates and articles
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-48% mb-16 relative`}
              onPress={() => handleMenuPress('Notifications')}
            >
              <Card variant="outlined">
                <UnreadBadge count={3} />
                <Text style={[tw`mb-4`, WineVisionStyles.cardHeader]}>
                  Announcements
                </Text>
                <Text style={WineVisionStyles.bodySmall}>
                  Important notifications
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-48% mb-16`}
              onPress={() => handleMenuPress('Profile')}
            >
              <Card variant="outlined">
                <Text style={[tw`mb-4`, WineVisionStyles.cardHeader]}>Profile</Text>
                <Text style={WineVisionStyles.bodySmall}>
                  Manage your account
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-48% mb-16`}
              onPress={() => handleMenuPress('ComingSoon')}
            >
              <Card variant="outlined">
                <Text style={[tw`mb-4`, WineVisionStyles.cardHeader]}>Events</Text>
                <Text style={WineVisionStyles.bodySmall}>
                  Upcoming sessions
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`w-48% mb-16`}
              onPress={() => handleMenuPress('FontTest')}
            >
              <Card variant="outlined">
                <Text style={[tw`mb-4`, WineVisionStyles.cardHeader]}>Font Test</Text>
                <Text style={WineVisionStyles.bodySmall}>
                  Test Wine Vision fonts
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Exhibitors */}
        <View style={tw`mt-24`}>
          <Text style={[tw`mb-16`, WineVisionStyles.h3]}>Featured Exhibitors</Text>
          
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
