import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { WVColors, WVStyles, WVFonts } from '../../utils/wvColors';

export const CleanColorDemo = () => {
  return (
    <ScrollView style={[tw`flex-1 p-4`, WVColors.bg.carbon5]}>
      
      {/* Header */}
      <Text style={WVStyles.h1}>🎨 Clean Color System</Text>
      <Text style={[WVStyles.body, tw`mb-6`]}>
        No more Tailwind warnings! All colors using CSS-in-JS.
      </Text>

      {/* Typography Examples */}
      <View style={tw`mb-8`}>
        <Text style={WVStyles.h2}>Typography Styles</Text>
        <Text style={WVStyles.h3}>Heading 3 Example</Text>
        <Text style={WVStyles.h4}>Heading 4 Example</Text>
        <Text style={WVStyles.body}>Body text example with proper styling.</Text>
        <Text style={WVStyles.bodySmall}>Small body text for secondary info.</Text>
        <Text style={WVStyles.caption}>Caption text for minimal information.</Text>
      </View>

      {/* Button Examples */}
      <View style={tw`mb-8`}>
        <Text style={WVStyles.h2}>Button Styles</Text>
        
        <TouchableOpacity style={[tw`mb-4`, WVStyles.primaryButton]}>
          <Text style={[tw`text-center font-semibold`, WVColors.text.white]}>
            Primary Button
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={WVStyles.secondaryButton}>
          <Text style={[tw`text-center font-medium`, WVColors.text.carbon]}>
            Secondary Button
          </Text>
        </TouchableOpacity>
      </View>

      {/* Color Swatches */}
      <View style={tw`mb-8`}>
        <Text style={WVStyles.h2}>Color Palette</Text>
        
        {/* Carbon Colors */}
        <Text style={[WVStyles.h4, tw`mt-4 mb-2`]}>Carbon Colors</Text>
        <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
          <View style={[tw`w-16 h-16 rounded-lg`, WVColors.bg.carbon]} />
          <View style={[tw`w-16 h-16 rounded-lg`, WVColors.bg.carbon80]} />
          <View style={[tw`w-16 h-16 rounded-lg`, WVColors.bg.carbon20]} />
          <View style={[tw`w-16 h-16 rounded-lg`, WVColors.bg.carbon10]} />
        </View>
        
        {/* Velvet Colors */}
        <Text style={[WVStyles.h4, tw`mb-2`]}>Velvet Colors</Text>
        <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
          <View style={[tw`w-16 h-16 rounded-lg`, WVColors.bg.velvet]} />
          <View style={[tw`w-16 h-16 rounded-lg`, WVColors.bg.velvet10]} />
        </View>
      </View>

      {/* Status Examples */}
      <View style={tw`mb-8`}>
        <Text style={WVStyles.h2}>Status Badges</Text>
        
        <View style={[tw`mb-2`, WVStyles.successBadge]}>
          <Text style={WVColors.text.green}>Success Message</Text>
        </View>
        
        <View style={WVStyles.errorBadge}>
          <Text style={WVColors.text.hot}>Error Message</Text>
        </View>
      </View>

      {/* Cards */}
      <View style={tw`mb-8`}>
        <Text style={WVStyles.h2}>Card Example</Text>
        
        <View style={WVStyles.card}>
          <Text style={[WVStyles.h3, tw`mb-2`]}>Card Title</Text>
          <Text style={WVStyles.body}>
            This is a card with proper Wine Vision styling using CSS-in-JS 
            instead of Tailwind utilities that cause warnings.
          </Text>
        </View>
      </View>

      {/* Usage Instructions */}
      <View style={[tw`p-4 rounded-lg mb-8`, WVColors.bg.carbon10]}>
        <Text style={[WVStyles.h3, tw`mb-3`]}>✅ Usage Guide</Text>
        
        <Text style={[WVStyles.bodySmall, tw`mb-2`]}>
          ❌ Don't use: tw`text-c bg-v`
        </Text>
        <Text style={[WVStyles.bodySmall, tw`mb-2`]}>
          ✅ Do use: [tw`text-lg`, WVColors.text.carbon, WVColors.bg.velvet]
        </Text>
        <Text style={[WVStyles.bodySmall, tw`mb-2`]}>
          ✅ Or use: WVStyles.h1, WVStyles.primaryButton, etc.
        </Text>
        
        <Text style={[WVStyles.caption, tw`mt-3`]}>
          This approach eliminates all Tailwind warnings while maintaining 
          consistent Wine Vision branding.
        </Text>
      </View>

    </ScrollView>
  );
};
