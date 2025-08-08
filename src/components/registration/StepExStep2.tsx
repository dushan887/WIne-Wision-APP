import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep2Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void; // Add bypass parameter
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-ex-step-2' (Participation Model)
const StepExStep2: React.FC<StepExStep2Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedModel, setSelectedModel] = useState(savedData?.wv_participationModel || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const options = [
    { 
      label: 'Solo Exhibitor', 
      value: 'Solo Exhibitor',
      subtitle: 'SINGLE STAND RENTAL',
      details: [
        { text: 'Share 24m² or 49m² stand with co-exhibitors you invite', type: 'OPTIONAL' },
        { text: 'Online payment of all exhibiting expenses', type: 'COMPULSORY' }
      ]
    },
    { 
      label: 'Head Exhibitor', 
      value: 'Head Exhibitor',
      subtitle: 'MULTIPLE STANDS RENTAL • UPON REQUEST',
      details: [
        { text: 'Invite members to register and assign stands', type: 'COMPULSORY' },
        { text: 'Online payment of all exhibiting expenses', type: 'COMPULSORY' }
      ]
    },
    // Co-Exhibitor is skipped as per requirement - only through website
  ];

  const handleSelect = (value: string) => {
    setSelectedModel(value);
    onUpdateData?.({ wv_participationModel: value });
    
    // Auto-advance to next step after a delay, bypassing validation
    setTimeout(() => {
      onNext?.(true); // Bypass validation for auto-advance
    }, 300);
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader title={headerTitle || 'You are applying as:'} subtitle={headerSubtitle || 'PARTICIPATION MODEL'} />
      
      {/* Option Cards - Same style as StepStart */}
      <View>
        {options.map((option) => {
          const selected = selectedModel === option.value;
          
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
                      tw`text-xl font-bold mb-1`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: '700'
                      }
                    ]}>{option.label}</Text>
                    
                    {/* Subtitle */}
                    <Text style={[
                      tw`text-xs uppercase text-center mb-4`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: '600',
                        letterSpacing: 0.8
                      }
                    ]}>{option.subtitle}</Text>
                    
                    {/* Details List */}
                    {option.details.map((detail, idx) => (
                      <View key={idx} style={[
                        tw`flex-row items-center justify-between px-3 py-2 mb-2 rounded`,
                        { backgroundColor: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)' }
                      ]}>
                        <Text style={[
                          tw`text-xs flex-1 mr-2`,
                          { 
                            color: selected ? colors.w : colors.c,
                            fontWeight: detail.text.includes('Online payment') ? '600' : '400'
                          }
                        ]}>{detail.text}</Text>
                        <Text style={[
                          tw`text-xs font-bold tracking-widest`,
                          { 
                            color: detail.type === 'COMPULSORY' 
                              ? (selected ? colors.w : colors.c) 
                              : (selected ? colors.w : colors.c)
                          }
                        ]}>{detail.type}</Text>
                      </View>
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
                    tw`text-xl font-bold mb-1`,
                    { 
                      color: selected ? colors.w : colors.c,
                      fontWeight: '700'
                    }
                  ]}>{option.label}</Text>
                  
                  {/* Subtitle */}
                  <Text style={[
                    tw`text-xs uppercase text-center mb-4`,
                    { 
                      color: selected ? colors.w : colors.c,
                      fontWeight: '600',
                      letterSpacing: 0.8
                    }
                  ]}>{option.subtitle}</Text>
                  
                  {/* Details List */}
                  {option.details.map((detail, idx) => (
                    <View key={idx} style={[
                      tw`flex-row items-center justify-between px-3 py-2 mb-2 rounded`,
                      { backgroundColor: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)' }
                    ]}>
                      <Text style={[
                        tw`text-xs flex-1 mr-2`,
                        { 
                          color: selected ? colors.w : colors.c,
                          fontWeight: detail.text.includes('Online payment') ? '600' : '400'
                        }
                      ]}>{detail.text}</Text>
                      <Text style={[
                        tw`text-xs font-bold tracking-widest`,
                        { 
                          color: detail.type === 'COMPULSORY' 
                            ? (selected ? colors.w : colors.c) 
                            : (selected ? colors.w : colors.c)
                        }
                      ]}>{detail.type}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepExStep2;
