import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { wvColors, wvFonts } from '../../utils/wineVisionColors';

export const SafeColorDemo = () => {
  return (
    <ScrollView style={tw`flex-1 p-4`}>
      <Text style={[tw`text-2xl font-bold mb-6`, wvColors.text.carbon]}>
        Safe Wine Vision Colors Demo
      </Text>
      
      <Text style={[tw`text-lg mb-4`, wvColors.text.carbon70]}>
        This demo shows how to use Wine Vision colors without Tailwind warnings.
      </Text>

      {/* Text Colors */}
      <View style={tw`mb-6`}>
        <Text style={[tw`text-xl font-bold mb-3`, wvColors.text.carbon]}>Text Colors</Text>
        
        <Text style={[tw`text-lg mb-2`, wvColors.text.carbon, wvFonts.primary]}>
          Carbon Text (Main)
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.carbon80, wvFonts.primary]}>
          Carbon 80% Text
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.carbon70, wvFonts.primary]}>
          Carbon 70% Text
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.velvet, wvFonts.primary]}>
          Velvet Text (Exhibitor)
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.green, wvFonts.primary]}>
          Green Text (Success)
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.hot, wvFonts.primary]}>
          Hot Text (Error)
        </Text>
      </View>

      {/* Background Colors */}
      <View style={tw`mb-6`}>
        <Text style={[tw`text-xl font-bold mb-3`, wvColors.text.carbon]}>Background Colors</Text>
        
        <View style={[tw`p-4 mb-3 rounded-lg`, wvColors.bg.carbon]}>
          <Text style={[tw`text-lg`, wvColors.text.white, wvFonts.primary]}>
            Carbon Background
          </Text>
        </View>
        
        <View style={[tw`p-4 mb-3 rounded-lg`, wvColors.bg.carbon10]}>
          <Text style={[tw`text-lg`, wvColors.text.carbon, wvFonts.primary]}>
            Carbon 10% Background
          </Text>
        </View>
        
        <View style={[tw`p-4 mb-3 rounded-lg`, wvColors.bg.velvet]}>
          <Text style={[tw`text-lg`, wvColors.text.white, wvFonts.primary]}>
            Velvet Background
          </Text>
        </View>
        
        <View style={[tw`p-4 mb-3 rounded-lg`, wvColors.bg.green15]}>
          <Text style={[tw`text-lg`, wvColors.text.green, wvFonts.primary]}>
            Success Background
          </Text>
        </View>
      </View>

      {/* Font Examples */}
      <View style={tw`mb-6`}>
        <Text style={[tw`text-xl font-bold mb-3`, wvColors.text.carbon]}>Font Families</Text>
        
        <Text style={[tw`text-lg mb-2`, wvColors.text.carbon, wvFonts.primary]}>
          Primary Font (Inter Tight)
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.carbon, wvFonts.primaryItalic]}>
          Primary Italic Font
        </Text>
        <Text style={[tw`text-lg mb-2`, wvColors.text.carbon, wvFonts.brand]}>
          Brand Font (Wine Vision Icons)
        </Text>
      </View>

      {/* Usage Instructions */}
      <View style={[tw`p-4 rounded-lg mb-6`, wvColors.bg.carbon5]}>
        <Text style={[tw`text-lg font-bold mb-2`, wvColors.text.carbon]}>
          Usage Instructions
        </Text>
        <Text style={[tw`text-sm mb-2`, wvColors.text.carbon70]}>
          Instead of using: tw`text-c bg-v font-inter-tight`
        </Text>
        <Text style={[tw`text-sm`, wvColors.text.carbon70]}>
          Use: [tw`text-lg`, wvColors.text.carbon, wvColors.bg.velvet, wvFonts.primary]
        </Text>
      </View>
    </ScrollView>
  );
};
