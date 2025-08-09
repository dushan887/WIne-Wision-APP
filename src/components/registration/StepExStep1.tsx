import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep1Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void; // Add bypass parameter
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-ex-step-1' (Field of Work)
const StepExStep1: React.FC<StepExStep1Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedField, setSelectedField] = useState(savedData?.wv_fieldOfWork || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const options = [
    { label: 'Wine', value: 'Wine' },
    { label: 'Spirits', value: 'Spirits' },
    { label: 'Food', value: 'Food' },
  ];

  const handleSelect = (value: string) => {
    setSelectedField(value);
    onUpdateData?.({ wv_fieldOfWork: value });
    
    // Auto-advance to next step after a delay, bypassing validation
    setTimeout(() => {
      onNext?.(true); // Bypass validation for auto-advance
    }, 300);
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader title={headerTitle || ''} subtitle={headerSubtitle || ''} />
      
      {/* Option Cards - Same style as StepStart */}
      <View>
        {options.map((option) => {
          const selected = selectedField === option.value;
          
          // Get background styling for the specific option being rendered
          const getOptionBackgroundStyling = () => {
            if (!selected) {
              return { useImage: false, backgroundColor: 'rgba(255,255,255,0.5)' };
            }
            
            // Get the theme colors for this specific option
            const optionTheme = getProfileTheme(savedData?.wv_profileSelection || null);
            
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
              key={option.value}
              style={[
                tw`mb-4 rounded-lg overflow-hidden`,
                !backgroundStyling.useImage && { backgroundColor: backgroundStyling.backgroundColor }
              ]}
              onPress={() => handleSelect(option.value)}
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
                    ]}>{option.label}</Text>
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
                  ]}>{option.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepExStep1;
