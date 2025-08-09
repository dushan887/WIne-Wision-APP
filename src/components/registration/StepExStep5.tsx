import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep5Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-ex-step-5' (Exhibiting Products)
const StepExStep5: React.FC<StepExStep5Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedOption, setSelectedOption] = useState(savedData?.wv_exhibitingProducts || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const options = [
    { 
      label: 'Yes', 
      value: 'Yes',
      description: 'Upload single product with image and specifications',
      type: 'COMPULSORY'
    },
    { 
      label: 'No', 
      value: 'No',
      description: 'Write a company description (up to 700 characters)',
      type: 'COMPULSORY'
    }
  ];

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    onUpdateData?.({ wv_exhibitingProducts: value });
    
    // Auto-advance to next step after a delay, bypassing validation
    setTimeout(() => {
      onNext?.(true); // Bypass validation for auto-advance
    }, 300);
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || ''} 
        subtitle={headerSubtitle || ''} 
      />
      
      {/* Option Cards - Same style as StepExStep2 */}
      <View>
        {options.map((option) => {
          const selected = selectedOption === option.value;
          
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
                tw`mb-4 rounded-lg overflow-hidden w-full`,
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
                  <View style={tw`items-center px-8 py-6`}>  
                    {/* Check Icon */}
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
                      tw`text-xl font-bold mb-4`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: '700'
                      }
                    ]}>{option.label}</Text>
                    
                    {/* Details */}
                    <View style={[
                      tw`flex-row items-center justify-between px-3 py-2 mb-2 rounded w-full`,
                      { backgroundColor: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)' }
                    ]}>
                      <Text style={[
                        tw`text-xs flex-1 mr-2`,
                        { 
                          color: selected ? colors.w : colors.c,
                          fontWeight: '600'
                        }
                      ]}>{option.description}</Text>
                      <Text style={[
                        tw`text-xs font-bold tracking-widest`,
                        { 
                          color: selected ? colors.w : colors.c
                        }
                      ]}>{option.type}</Text>
                    </View>
                  </View>
                </ImageBackground>
              ) : (
                <View style={tw`items-center px-8 py-6`}>  
                  {/* Check Icon */}
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
                    tw`text-xl font-bold mb-4`,
                    { 
                      color: selected ? colors.w : colors.c,
                      fontWeight: '700'
                    }
                  ]}>{option.label}</Text>
                  
                  {/* Details */}
                  <View style={[
                    tw`flex-row items-center justify-between px-3 py-2 mb-2 rounded w-full`,
                    { backgroundColor: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)' }
                  ]}>
                    <Text style={[
                      tw`text-xs flex-1 mr-2`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: '600'
                      }
                    ]}>{option.description}</Text>
                    <Text style={[
                      tw`text-xs font-bold tracking-widest`,
                      { 
                        color: selected ? colors.w : colors.c
                      }
                    ]}>{option.type}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepExStep5;
