import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { WineVisionStyles, WineVisionColors } from '../../utils/wineVisionDesign';

/**
 * Wine Vision Design System Demo Component
 * 
 * This component demonstrates all the Wine Vision colors, fonts, and styling patterns.
 * Use this as a reference for implementing the Wine Vision brand consistently across the app.
 */
export const WineVisionDemo: React.FC = () => {
  return (
    <ScrollView style={tw`flex-1 bg-c_5`}>
      <View style={tw`p-20`}>
        
        {/* Typography Demo */}
        <View style={tw`mb-32`}>
          <Text style={WineVisionStyles.h1}>Typography Showcase</Text>
          <Text style={[WineVisionStyles.h2, tw`mt-16`]}>Heading 2 - Inter Tight Semi-Bold</Text>
          <Text style={[WineVisionStyles.h3, tw`mt-12`]}>Heading 3 - Inter Tight Medium</Text>
          <Text style={[WineVisionStyles.h4, tw`mt-8`]}>Heading 4 - Inter Tight Medium</Text>
          <Text style={[WineVisionStyles.body, tw`mt-12`]}>
            Body text using Inter Tight Regular. This demonstrates the primary font for content and descriptions.
          </Text>
          <Text style={[WineVisionStyles.bodySmall, tw`mt-8`]}>
            Small body text for secondary information and captions.
          </Text>
          <Text style={[WineVisionStyles.caption, tw`mt-4`]}>
            Caption text for minimal information display.
          </Text>
        </View>

        {/* Color Palette Demo */}
        <View style={tw`mb-32`}>
          <Text style={WineVisionStyles.h2}>Color Palette</Text>
          
          {/* Carbon Colors */}
          <Text style={[WineVisionStyles.h4, tw`mt-20 mb-12`]}>Carbon (Dark Theme)</Text>
          <View style={tw`flex-row flex-wrap`}>
            <ColorSwatch color="c" label="Carbon Primary" />
            <ColorSwatch color="c_95" label="Carbon 95%" />
            <ColorSwatch color="c_90" label="Carbon 90%" />
            <ColorSwatch color="c_80" label="Carbon 80%" />
            <ColorSwatch color="c_50" label="Carbon 50%" />
            <ColorSwatch color="c_20" label="Carbon 20%" />
            <ColorSwatch color="c_10" label="Carbon 10%" />
          </View>

          {/* Velvet Colors */}
          <Text style={[WineVisionStyles.h4, tw`mt-20 mb-12`]}>Velvet (Exhibitors)</Text>
          <View style={tw`flex-row flex-wrap`}>
            <ColorSwatch color="v_dark" label="Velvet Dark" />
            <ColorSwatch color="v" label="Velvet Primary" />
            <ColorSwatch color="v_80" label="Velvet 80%" />
            <ColorSwatch color="v_70" label="Velvet 70%" />
            <ColorSwatch color="v_20" label="Velvet 20%" />
            <ColorSwatch color="v_10" label="Velvet 10%" />
          </View>

          {/* Status Colors */}
          <Text style={[WineVisionStyles.h4, tw`mt-20 mb-12`]}>Status Colors</Text>
          <View style={tw`flex-row flex-wrap`}>
            <ColorSwatch color="g" label="Success Green" />
            <ColorSwatch color="b" label="Info Blue" />
            <ColorSwatch color="y" label="Warning Yellow" />
            <ColorSwatch color="r" label="Error Red" />
            <ColorSwatch color="h" label="Danger Hot" />
          </View>

          {/* Wine Colors */}
          <Text style={[WineVisionStyles.h4, tw`mt-20 mb-12`]}>Wine Product Colors</Text>
          <View style={tw`flex-row flex-wrap`}>
            <ColorSwatch color="wine-white" label="White Wine" />
            <ColorSwatch color="wine-rose" label="Rosé Wine" />
            <ColorSwatch color="wine-orange" label="Orange Wine" />
            <ColorSwatch color="wine-red" label="Red Wine" />
            <ColorSwatch color="wine-sparkling" label="Sparkling" />
          </View>
        </View>

        {/* Button Styles Demo */}
        <View style={tw`mb-32`}>
          <Text style={WineVisionStyles.h2}>Button Styles</Text>
          
          <TouchableOpacity style={[WineVisionStyles.primaryButton, tw`mt-16`]}>
            <Text style={tw`text-w font-inter-tight font-600 text-center`}>Primary Button</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[WineVisionStyles.secondaryButton, tw`mt-12`]}>
            <Text style={tw`text-c font-inter-tight font-500 text-center`}>Secondary Button</Text>
          </TouchableOpacity>
        </View>

        {/* Status Badges Demo */}
        <View style={tw`mb-32`}>
          <Text style={WineVisionStyles.h2}>Status Badges</Text>
          
          <View style={tw`flex-row flex-wrap mt-16`}>
            <View style={[WineVisionStyles.successBadge, tw`mr-8 mb-8`]}>
              <Text>Success</Text>
            </View>
            <View style={[WineVisionStyles.errorBadge, tw`mr-8 mb-8`]}>
              <Text>Error</Text>
            </View>
            <View style={[WineVisionStyles.warningBadge, tw`mr-8 mb-8`]}>
              <Text>Warning</Text>
            </View>
            <View style={[WineVisionStyles.infoBadge, tw`mr-8 mb-8`]}>
              <Text>Info</Text>
            </View>
          </View>
        </View>

        {/* Gradient Demo */}
        <View style={tw`mb-32`}>
          <Text style={WineVisionStyles.h2}>Gradient Backgrounds</Text>
          
          <View style={tw`bg-carbon-gradient-up p-20 rounded-12 mt-16 mb-12`}>
            <Text style={tw`text-w font-inter-tight font-600 text-center`}>Carbon Gradient</Text>
          </View>
          
          <View style={tw`bg-exhibitor-gradient-light p-20 rounded-12 mb-12`}>
            <Text style={tw`text-w font-inter-tight font-600 text-center`}>Velvet Gradient</Text>
          </View>
          
          <View style={tw`bg-wv-gradient p-20 rounded-12 mb-12`}>
            <Text style={tw`text-w font-inter-tight font-600 text-center`}>Wine Vision Brand Gradient</Text>
          </View>
        </View>

        {/* Card Demo */}
        <View style={tw`mb-32`}>
          <Text style={WineVisionStyles.h2}>Card Components</Text>
          
          <View style={[WineVisionStyles.card, tw`mt-16`]}>
            <Text style={WineVisionStyles.cardHeader}>Sample Card</Text>
            <Text style={WineVisionStyles.body}>
              This card demonstrates the Wine Vision styling with proper padding, shadows, and typography.
            </Text>
            <TouchableOpacity style={[WineVisionStyles.primaryButton, tw`mt-16`]}>
              <Text style={tw`text-w font-inter-tight font-600 text-center`}>Action Button</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

// Helper component for color swatches
const ColorSwatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <View style={tw`mr-8 mb-12`}>
    <View style={tw`w-60 h-40 bg-${color} rounded-8 mb-4`} />
    <Text style={[WineVisionStyles.caption, tw`text-center w-60`]}>{label}</Text>
  </View>
);

export default WineVisionDemo;
