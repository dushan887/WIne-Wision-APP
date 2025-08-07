import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
// Import custom color values directly
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeaderLogoLight from '../../../assets/images/Header_Logo_Info_LIGHT.svg';
import ExhibitorBannerHead from '../../../assets/images/APP_Exhibitor_BANNER_Head.svg';
import BuyerBannerHead from '../../../assets/images/APP_Buyer_BANNER_Head.svg';
import VisitorBannerHead from '../../../assets/images/APP_Visitor_BANNER_Head.svg';

type LandingNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const LandingScreen = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.c }]}>
      <ScrollView contentContainerStyle={tw`flex-grow pb-8`} style={{ backgroundColor: colors.c }}>
      {/* Logo and Event Info */}
      <View style={tw`items-center mt-12 mb-8`}>
        <HeaderLogoLight width={300} height={100} />
      </View>

      {/* Exhibit Card */}
      <View style={tw`mx-6 overflow-hidden rounded-t-2xl -mb-8`}>
        {/* Exhibit Background Image */}
        <Image
          source={require('../../../assets/images/APP_Exhibitor_BANNER_Bck.jpg')}
          style={tw`absolute w-full h-full`}
          resizeMode="cover"
        />
        <View style={tw`pt-4 pb-8 px-6`}>
          {/* Exhibit Logo Row */}
          <View style={tw`items-center`}>
            <ExhibitorBannerHead width={400} height={120} />
          </View>
          {/* Exhibit Text and Button Row */}
          <View style={tw`flex-row items-center pb-6`}>
        {/* Text Column */}
        <View style={tw`flex-1`}>
            <Text style={[tw`text-sm font-medium`, { color: colors.v_50 }]}>
            Showcase your products
            </Text>
            <Text style={[tw`text-sm font-medium`, { color: colors.w }]}>
            Create Exhibitor's account
            </Text>
        </View>
        {/* Button Column */}
        <View style={tw`justify-center`}>
          <TouchableOpacity
            style={[tw`px-4 py-2 rounded-full`, { backgroundColor: colors.c_95 }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[tw`font-bold text-base`, { color: colors.v_50 }]}>
            Sign up
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>

      {/* Trade Card */}
      <View style={tw`mx-6 overflow-hidden rounded-t-2xl -mb-8`}>
        {/* Trade Background Image */}
        <Image
          source={require('../../../assets/images/APP_Buyer_BANNER_Bck.jpg')}
          style={tw`absolute w-full h-full`}
          resizeMode="cover"
        />
        <View style={tw`pt-4 pb-8 px-6`}>
          {/* Trade Logo Row */}
          <View style={tw`items-center`}>
            <BuyerBannerHead width={400} height={120} />
          </View>
          {/* Trade Text and Button Row */}
          <View style={tw`flex-row items-center pb-6`}>
        {/* Text Column */}
        <View style={tw`flex-1`}>
            <Text style={[tw`text-sm font-medium`, { color: colors.y }]}>
            Expand your professional network
            </Text>
            <Text style={[tw`text-sm font-medium`, { color: colors.w }]}>
            Create Pro-Buyer's account
            </Text>
        </View>
        {/* Button Column */}
        <View style={tw`justify-center`}>
          <TouchableOpacity
            style={[tw`px-4 py-2 rounded-full`, { backgroundColor: colors.c_95 }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[tw`font-bold text-base`, { color: colors.y }]}>
            Sign up
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>

      {/* Visit Card */}
      <View style={tw`mx-6 overflow-hidden rounded-t-2xl mb-8`}>
        {/* Visit Background Image */}
        <Image
          source={require('../../../assets/images/APP_Visitor_BANNER_Bck.jpg')}
          style={tw`absolute w-full h-full`}
          resizeMode="cover"
        />
        <View style={tw`pt-4 pb-8 px-6`}>
          {/* Visit Logo Row */}
          <View style={tw`items-center`}>
            <VisitorBannerHead width={400} height={120} />
          </View>
          {/* Visit Text and Button Row */}
          <View style={tw`flex-row items-center pb-6`}>
        {/* Text Column */}
        <View style={tw`flex-1`}>
            <Text style={[tw`text-sm font-medium`, { color: colors.r_50 }]}>
            Experience new flavors
            </Text>
            <Text style={[tw`text-sm font-medium`, { color: colors.w }]}>
            Create Visitor's account
            </Text>
        </View>
        {/* Button Column */}
        <View style={tw`justify-center`}>
          <TouchableOpacity
            style={[tw`px-4 py-2 rounded-full`, { backgroundColor: colors.c_95 }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[tw`font-bold text-base`, { color: colors.r_50 }]}>
            Sign up
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;