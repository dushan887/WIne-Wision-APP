import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { WineVisionStyles } from '../../utils/wineVisionDesign';

/**
 * Font Test Component
 * 
 * This component tests the loaded Wine Vision fonts to ensure they're working correctly.
 */
export const FontTest: React.FC = () => {
  return (
    <ScrollView style={tw`flex-1 bg-c_5`}>
      <View style={tw`p-20`}>
        
        {/* Test Inter Tight Variable Font */}
        <View style={tw`mb-32`}>
          <Text style={[WineVisionStyles.h1, tw`text-center`]}>
            Wine Vision 2025
          </Text>
          <Text style={[WineVisionStyles.h2, tw`text-center mt-16`]}>
            Inter Tight Variable Font Test
          </Text>
          <Text style={[WineVisionStyles.body, tw`text-center mt-12`]}>
            This text should display in Inter Tight Variable Font.
            If you see this text in the proper Wine Vision typography,
            the fonts are loading correctly!
          </Text>
        </View>

        {/* Font Weight Tests */}
        <View style={tw`mb-32`}>
          <Text style={[WineVisionStyles.h3, tw`mb-16`]}>Font Weight Tests</Text>
          
          <Text style={tw`font-inter-tight font-100 text-18 text-c mb-8`}>
            Inter Tight 100 - Ultra Light
          </Text>
          <Text style={tw`font-inter-tight font-300 text-18 text-c mb-8`}>
            Inter Tight 300 - Light
          </Text>
          <Text style={tw`font-inter-tight font-400 text-18 text-c mb-8`}>
            Inter Tight 400 - Regular
          </Text>
          <Text style={tw`font-inter-tight font-500 text-18 text-c mb-8`}>
            Inter Tight 500 - Medium
          </Text>
          <Text style={tw`font-inter-tight font-600 text-18 text-c mb-8`}>
            Inter Tight 600 - Semi Bold
          </Text>
          <Text style={tw`font-inter-tight font-700 text-18 text-c mb-8`}>
            Inter Tight 700 - Bold
          </Text>
          <Text style={tw`font-inter-tight font-800 text-18 text-c mb-8`}>
            Inter Tight 800 - Extra Bold
          </Text>
          <Text style={tw`font-inter-tight font-900 text-18 text-c mb-8`}>
            Inter Tight 900 - Black
          </Text>
        </View>

        {/* Italic Test */}
        <View style={tw`mb-32`}>
          <Text style={[WineVisionStyles.h3, tw`mb-16`]}>Italic Font Test</Text>
          <Text style={tw`font-inter-tight-italic font-400 text-18 text-c mb-8`}>
            Inter Tight Italic 400 - Regular Italic
          </Text>
          <Text style={tw`font-inter-tight-italic font-600 text-18 text-c mb-8`}>
            Inter Tight Italic 600 - Semi Bold Italic
          </Text>
          <Text style={tw`font-inter-tight-italic font-700 text-18 text-c mb-8`}>
            Inter Tight Italic 700 - Bold Italic
          </Text>
        </View>

        {/* Wine Vision Icons Test */}
        <View style={tw`mb-32`}>
          <Text style={[WineVisionStyles.h3, tw`mb-16`]}>Wine Vision Icons Test</Text>
          <Text style={[WineVisionStyles.body, tw`mb-12`]}>
            Testing Wine Vision icon font. If properly loaded, custom icons should appear below:
          </Text>
          
          {/* Icon font test - these would show actual icons if the font has proper character mappings */}
          <View style={tw`flex-row flex-wrap`}>
            <View style={tw`bg-v_10 p-16 rounded-8 mr-12 mb-12 items-center`}>
              <Text style={tw`font-wine-vision text-24 text-v mb-4`}>
                WV
              </Text>
              <Text style={tw`font-inter-tight text-12 text-c_70`}>
                Wine Vision
              </Text>
            </View>
            
            <View style={tw`bg-y_10 p-16 rounded-8 mr-12 mb-12 items-center`}>
              <Text style={tw`font-wine-vision text-24 text-y mb-4`}>
                🍷
              </Text>
              <Text style={tw`font-inter-tight text-12 text-c_70`}>
                Wine Glass
              </Text>
            </View>
            
            <View style={tw`bg-g_15 p-16 rounded-8 mr-12 mb-12 items-center`}>
              <Text style={tw`font-wine-vision text-24 text-g mb-4`}>
                ✓
              </Text>
              <Text style={tw`font-inter-tight text-12 text-c_70`}>
                Success
              </Text>
            </View>
          </View>
        </View>

        {/* Fallback Font Test */}
        <View style={tw`mb-32`}>
          <Text style={[WineVisionStyles.h3, tw`mb-16`]}>Fallback Fonts Test</Text>
          <Text style={tw`font-inter font-400 text-16 text-c_80 mb-8`}>
            Inter Regular (Fallback) - Should load if Inter Tight fails
          </Text>
          <Text style={tw`font-inter-semibold font-600 text-16 text-c_80 mb-8`}>
            Inter Semi Bold (Fallback)
          </Text>
          <Text style={tw`font-inter-bold font-700 text-16 text-c_80 mb-8`}>
            Inter Bold (Fallback)
          </Text>
        </View>

        {/* Wine Vision Brand Colors with Fonts */}
        <View style={tw`mb-32`}>
          <Text style={[WineVisionStyles.h3, tw`mb-16`]}>Brand Integration Test</Text>
          
          <View style={tw`bg-wv-gradient p-20 rounded-12 mb-16`}>
            <Text style={tw`font-inter-tight font-700 text-20 text-w text-center mb-8`}>
              Wine Vision 2025
            </Text>
            <Text style={tw`font-inter-tight font-400 text-16 text-w text-center`}>
              Complete Brand Integration
            </Text>
          </View>
          
          <View style={tw`bg-v p-20 rounded-12 mb-16`}>
            <Text style={tw`font-inter-tight font-600 text-18 text-w text-center mb-4`}>
              Exhibitors Section
            </Text>
            <Text style={tw`font-inter-tight font-400 text-14 text-v_10 text-center`}>
              Velvet Purple Brand Color
            </Text>
          </View>
          
          <View style={tw`bg-c p-20 rounded-12 mb-16`}>
            <Text style={tw`font-inter-tight font-600 text-18 text-w text-center mb-4`}>
              Carbon Dark Theme
            </Text>
            <Text style={tw`font-inter-tight font-400 text-14 text-c_20 text-center`}>
              Primary Dark Background
            </Text>
          </View>
        </View>

        {/* Success Indicator */}
        <View style={tw`bg-g_15 border-2 border-g p-20 rounded-12`}>
          <Text style={tw`font-inter-tight font-700 text-18 text-g text-center mb-8`}>
            ✅ Font Integration Success!
          </Text>
          <Text style={tw`font-inter-tight font-400 text-16 text-c_80 text-center`}>
            If this text displays correctly in Inter Tight with proper weights and the colors appear as expected, 
            your Wine Vision font integration is working perfectly!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FontTest;
