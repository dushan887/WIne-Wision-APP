import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepExStep3Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-ex-step-3' (Professional Activities Category)
const StepExStep3: React.FC<StepExStep3Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedCategory, setSelectedCategory] = useState(savedData?.wv_userCategory || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  // Determine categories based on participation model and field of work
  const getCategoriesForUser = () => {
    const participationModel = savedData?.wv_participationModel || '';
    const fieldOfWork = savedData?.wv_fieldOfWork || '';
    
    // Determine the selected category logic from PHP
    let selectedCategory = participationModel;
    if (fieldOfWork === 'Spirits' || fieldOfWork === 'Food') {
      selectedCategory = fieldOfWork;
    }
    
    switch (selectedCategory) {
      case 'Solo Exhibitor':
        return [
          'Winemaker',
          'Winemaker & Distiller',
          'Distributor',
          'Institute / Academy',
          'Wine Equipment',
          'Other'
        ];
      case 'Head Exhibitor':
        return [
          'Winemaker',
          'Association / Institution',
          'Chamber of Commerce',
          'Distributor',
          'Wine Equipment',
          'Other'
        ];
      case 'Co-Exhibitor':
        return [
          'Winemaker',
          'Winemaker & Distiller',
          'Distributor',
          'Institute / Academy',
          'Wine Equipment',
          'Other'
        ];
      case 'Spirits':
        return [
          'Distiller',
          'Distillation Equipment',
          'Other'
        ];
      case 'Food':
        return [
          'Food Producer',
          'Hospitality Equipment',
          'Hotels',
          'Restaurants',
          'Catering',
          'Other'
        ];
      default:
        return [];
    }
  };

  const categories = getCategoriesForUser();

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    onUpdateData?.({ wv_userCategory: value });
    
    // Auto-advance to next step after a delay, bypassing validation
    setTimeout(() => {
      onNext?.(true); // Bypass validation for auto-advance
    }, 300);
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || 'Select your category'} 
        subtitle={headerSubtitle || 'PROFESSIONAL ACTIVITIES CATEGORY • CHOOSE SINGLE OPTION'} 
      />
      
      {/* Option Cards - Horizontal layout with icons */}
      <View>
        {categories.map((category) => {
          const selected = selectedCategory === category;
          
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
              key={category}
              style={[
                tw`mb-4 rounded-lg overflow-hidden w-full`,
                !backgroundStyling.useImage && { backgroundColor: backgroundStyling.backgroundColor }
              ]}
              onPress={() => handleSelect(category)}
            >
              {backgroundStyling.useImage ? (
                <ImageBackground
                  source={backgroundStyling.backgroundImage}
                  style={tw`w-full min-h-20`}
                  imageStyle={tw`rounded-lg`}
                  resizeMode="cover"
                >
                  <View style={tw`flex-row items-center px-8 py-6 min-h-20`}>  
                    {/* Check Icon */}
                    <View style={[
                      tw`w-12 h-12 rounded-full items-center justify-center mr-4`,
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
                    
                    {/* Category Label */}
                    <Text style={[
                      tw`text-lg flex-1`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: selected ? '700' : '500'
                      }
                    ]}>{category}</Text>
                  </View>
                </ImageBackground>
              ) : (
                <View style={tw`flex-row items-center px-8 py-6 min-h-20`}>  
                  {/* Check Icon */}
                  <View style={[
                    tw`w-12 h-12 rounded-full items-center justify-center mr-4`,
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
                  
                  {/* Category Label */}
                  <Text style={[
                    tw`text-lg flex-1`,
                    { 
                      color: selected ? colors.w : colors.c,
                      fontWeight: selected ? '700' : '500'
                    }
                  ]}>{category}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepExStep3;
