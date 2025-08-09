import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep1Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-pb-step-1' (Professional Activities Category for Pro-Buyer)
const StepPbStep1: React.FC<StepPbStep1Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedCategory, setSelectedCategory] = useState(savedData?.wv_userCategory || '');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  // Categories for Pro-Buyer profile
  const getCategoriesForUser = () => {
    const profileSelection = savedData?.wv_profileSelection || '';
    
    switch (profileSelection) {
      case 'Buyer':
        return [
          'Importer',
          'Wholesaler',
          'Retailer',
          'HORECA',
          'Sales Agent',
          'Chamber of Commerce',
          'Export / Import',
          'Market Trends Analysis',
          'Business Consulting',
          'Sales and Marketing',
          'Industry Promotion',
          'Events Production',
          'Distributor',
          'Culture and Tourism',
          'Catering',
          'Other'
        ];
      case 'Visitor':
        return [
          'Business and Trading',
          'Industry Expert',
          'Food and Beverage',
          'Media and Influencing',
          'Sales Agent',
          'Chamber of Commerce',
          'Export / Import',
          'Market Trends Analysis',
          'Business Consulting',
          'Sales and Marketing',
          'Industry Promotion',
          'Events Production',
          'Distributor',
          'Culture and Tourism',
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
                  style={tw`w-full`}
                  imageStyle={tw`rounded-lg`}
                  resizeMode="cover"
                >
                  <View style={tw`flex-row items-center px-4 py-3 min-h-16`}>  
                    {/* Check Icon */}
                    <View style={[
                      tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                      { backgroundColor: colors.w }
                    ]}>
                      <View style={tw`relative items-center justify-center`}>
                        <Text style={[
                          tw`text-2xl`,
                          { fontFamily: 'Wine-Vision', color: selected ? colors.g : colors.c_20 }
                        ]}>&#xe949;</Text>
                        <Text style={[
                          tw`text-2xl absolute`,
                          { fontFamily: 'Wine-Vision', color: colors.w }
                        ]}>&#xe94a;</Text>
                      </View>
                    </View>
                    
                    {/* Category Label */}
                    <Text style={[
                      tw`text-base flex-1`,
                      { 
                        color: selected ? colors.w : colors.c,
                        fontWeight: selected ? '700' : '500'
                      }
                    ]}>{category}</Text>
                  </View>
                </ImageBackground>
              ) : (
                <View style={tw`flex-row items-center px-4 py-3 min-h-16`}>  
                  {/* Check Icon */}
                  <View style={[
                    tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                    { backgroundColor: colors.w }
                  ]}>
                    <View style={tw`relative items-center justify-center`}>
                      <Text style={[
                        tw`text-2xl`,
                        { fontFamily: 'Wine-Vision', color: selected ? colors.g : colors.c_20 }
                      ]}>&#xe949;</Text>
                      <Text style={[
                        tw`text-2xl absolute`,
                        { fontFamily: 'Wine-Vision', color: colors.w }
                      ]}>&#xe94a;</Text>
                    </View>
                  </View>
                  
                  {/* Category Label */}
                  <Text style={[
                    tw`text-base flex-1`,
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

export default StepPbStep1;
