import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { WineVisionColors } from '../../utils/wineVisionDesign';

const ContactScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:info@winevision.rs');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+381114028888');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://winevision.rs');
  };

  return (
    <ScrollView style={tw`flex-1 bg-${WineVisionColors.carbon.primary}`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-white text-2xl font-bold mb-6`}>Contact Us</Text>
        
        {/* Email */}
        <TouchableOpacity 
          style={tw`flex-row items-center mb-4 p-4 bg-${WineVisionColors.carbon.light} rounded-lg`}
          onPress={handleEmailPress}
        >
          <Ionicons name="mail-outline" size={24} color="rgb(255,255,255)" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Email</Text>
            <Text style={tw`text-${WineVisionColors.carbon.muted}`}>info@winevision.rs</Text>
          </View>
        </TouchableOpacity>

        {/* Phone */}
        <TouchableOpacity 
          style={tw`flex-row items-center mb-4 p-4 bg-${WineVisionColors.carbon.light} rounded-lg`}
          onPress={handlePhonePress}
        >
          <Ionicons name="call-outline" size={24} color="rgb(255,255,255)" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Phone</Text>
            <Text style={tw`text-${WineVisionColors.carbon.muted}`}>+381 11 40 28 888</Text>
          </View>
        </TouchableOpacity>

        {/* Website */}
        <TouchableOpacity 
          style={tw`flex-row items-center mb-4 p-4 bg-${WineVisionColors.carbon.light} rounded-lg`}
          onPress={handleWebsitePress}
        >
          <Ionicons name="globe-outline" size={24} color="rgb(255,255,255)" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Website</Text>
            <Text style={tw`text-${WineVisionColors.carbon.muted}`}>winevision.rs</Text>
          </View>
        </TouchableOpacity>

        {/* Address */}
        <View style={tw`flex-row items-center mb-4 p-4 bg-${WineVisionColors.carbon.light} rounded-lg`}>
          <Ionicons name="location-outline" size={24} color="rgb(255,255,255)" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Address</Text>
            <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Belgrade Fair</Text>
            <Text style={tw`text-${WineVisionColors.carbon.muted}`}>Bulevar vojvode Mišića 14</Text>
            <Text style={tw`text-${WineVisionColors.carbon.muted}`}>11000 Belgrade, Serbia</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactScreen;
