import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme, ProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepStartProps {
  savedData: any;
  onSelectProfile: (profile: 'Exhibitor' | 'Buyer' | 'Visitor') => void;
  profileConfig?: ProfileTheme; 
  headerTitle?: string; // Add header props
  headerSubtitle?: string;
}

const StepStart: React.FC<StepStartProps> = ({ savedData, onSelectProfile, profileConfig, headerTitle, headerSubtitle }) => {
  const options = [
    { label: 'Exhibitor', value: 'Exhibitor', description: ['Showcase your products', 'Attend business meetings', 'Trade with buyers'] },
    { label: 'Pro-Buyer', value: 'Buyer', description: ['Attend business meetings', 'Expand your professional network', 'Trade with exhibitors'] },
    { label: 'Visitor', value: 'Visitor', description: ['Experience new flavors', 'Promote your company', 'Save favorites'] },
  ];

  // Get the appropriate selection colors based on the current profile
  const getSelectionColors = () => {
    if (!profileConfig?.selectionColors) {
      return { primary: colors.g, light: colors.g_15 }; // Default green
    }
    return profileConfig.selectionColors;
  };

  const selectionColors = getSelectionColors();

  return (
    <View style={tw`px-6 py-2`}>  
        {/* Header */}
        {headerTitle && headerSubtitle && (
          <StepHeader title={headerTitle} subtitle={headerSubtitle} />
        )}

        {/* Option Cards */}
        {options.map(opt => {
          const selected = savedData.wv_profileSelection === opt.value;
          
          // Get background styling for the specific option being rendered
          const getOptionBackgroundStyling = () => {
            if (!selected) {
              return { useImage: false, backgroundColor: colors.c_5 };
            }
            
            // Get the theme colors for this specific option
            const optionTheme = getProfileTheme(opt.value as 'Exhibitor' | 'Buyer' | 'Visitor');
            
            if (optionTheme.useImageForSelection && optionTheme.selectionBackgroundImage) {
              return { 
                useImage: true, 
                backgroundImage: optionTheme.selectionBackgroundImage 
              };
            } else {
              return { 
                useImage: false, 
                backgroundColor: optionTheme.selectionColors.light 
              };
            }
          };

          const backgroundStyling = getOptionBackgroundStyling();
          
          return (
            <TouchableOpacity
              key={opt.value}
              style={[
                tw`mb-4 rounded-lg overflow-hidden`,
                !backgroundStyling.useImage && { backgroundColor: backgroundStyling.backgroundColor }
              ]}
              onPress={() => onSelectProfile(opt.value as any)}
            >
              {backgroundStyling.useImage ? (
                <ImageBackground
                  source={backgroundStyling.backgroundImage}
                  style={tw`w-full`}
                  imageStyle={tw`rounded-lg`}
                  resizeMode="cover"
                >
                  <View style={tw`p-6 items-center`}>  
                    {/* Check Icon - Always Visible */}
                    <View style={[
                      tw`w-12 h-12 rounded-full items-center justify-center mb-3`,
                      { backgroundColor: colors.w }
                    ]}>
                      <View style={tw`relative items-center justify-center`}>
                        <Text style={[
                          tw`text-3xl`,
                          { fontFamily: 'Wine-Vision', color: selected ? colors.g : colors.c_20 }
                        ]}>&#xe949;</Text>
                        <Text style={[
                          tw`text-3xl absolute`,
                          { fontFamily: 'Wine-Vision', color: colors.w }
                        ]}>&#xe94a;</Text>
                      </View>
                    </View>
                    {/* Label */}
                    <Text style={[
                      tw`text-lg mb-2`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: selected ? '700' : '500'
                      }
                    ]}>{opt.label}</Text>
                    {/* Description Bullets */}
                    {opt.description.map((line, idx) => (
                      <Text key={idx} style={[
                        tw`text-center text-sm`,
                        { color: selected ? colors.w : colors.c }
                      ]}>{`• ${line}`}</Text>
                    ))}
                  </View>
                </ImageBackground>
              ) : (
                <View style={tw`p-6 items-center`}>  
                  {/* Check Icon - Always Visible */}
                  <View style={[
                    tw`w-12 h-12 rounded-full items-center justify-center mb-3`,
                    { backgroundColor: colors.w }
                  ]}>
                    <View style={tw`relative items-center justify-center`}>
                      <Text style={[
                        tw`text-3xl`,
                        { fontFamily: 'Wine-Vision', color: selected ? colors.g : colors.c_20 }
                      ]}>&#xe949;</Text>
                      <Text style={[
                        tw`text-3xl absolute`,
                        { fontFamily: 'Wine-Vision', color: colors.w }
                      ]}>&#xe94a;</Text>
                    </View>
                  </View>
                  {/* Label */}
                  <Text style={[
                    tw`text-lg mb-2`,
                    { 
                      color: selected ? colors.w : colors.c,
                      fontWeight: selected ? '700' : '500'
                    }
                  ]}>{opt.label}</Text>
                  {/* Description Bullets */}
                  {opt.description.map((line, idx) => (
                    <Text key={idx} style={[
                      tw`text-center text-sm`,
                      { color: selected ? colors.w : colors.c }
                    ]}>{`• ${line}`}</Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default StepStart;
