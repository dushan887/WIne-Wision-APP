import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPbStep5Props {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'wv-pb-step-5' (Points of Interest)
const StepPbStep5: React.FC<StepPbStep5Props> = ({ savedData, onUpdateData, onNext, headerTitle, headerSubtitle }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    savedData?.wv_pointsOfInterest || []
  );
  const [activeFilter, setActiveFilter] = useState('WINE');
  
  // Get the current profile theme
  const profileTheme = getProfileTheme(savedData?.wv_profileSelection || null);
  
  const filters = ['WINE', 'FOOD', 'SPIRITS', 'DISTRIBUTION', 'WHOLESALE', 'RETAIL', 'HORECA'];

  const tagGroups = {
    'WINE': [
      'Wine', 'SerbianWines', 'N.MacedonianWines', 'AlbanianWines', 'BalkanWines',
      'SerbianWinemakers', 'N.MacedonianWinemakers', 'AlbanianWinemakers', 'BalkanWinemakers',
      'PremiumWines', 'OrganicWines', 'AwardedWines', 'AutochthonousWines',
      'BoutiqueWineries', 'FamilyWineries', 'GarageWineries',
      'Red', 'White', 'Rosé', 'Sparkling', 'Orange', 'Fortified', 'Dessert', 'Aromatized', 'Non-Grape',
      'WineTasting', 'Wine&FoodPairing', 'WineIndustry', 'WineTrading', 'Winemaking',
      'WineBranding', 'WinePackaging', 'WineGlass', 'WineBottle', 'WineCork',
      'WineTourism', 'WineEvents', 'WineEquipment', 'VineyardEquipment', 'AgriculturalEquipment'
    ],
    'FOOD': [
      'Food', 'Gastronomy', 'SerbianFood', 'N.MacedonianFood', 'AlbanianFood', 'BalkanFood',
      'SerbianCuisine', 'N.MacedonianCuisine', 'AlbanianCuisine', 'BalkanCuisine',
      'ContemporaryCuisine', 'PremiumFood', 'OrganicFood', 'GourmetExperience',
      'CulinaryArts', 'FoodIndustry', 'FoodTrading', 'FoodProducing',
      'FoodMarketing', 'FoodBranding', 'FoodPackaging', 'GastroTourism', 'FoodEquipment'
    ],
    'SPIRITS': [
      'Rakija(Spirits)', 'Spirits', 'SerbianRakija', 'N.MacedonianRakija', 'AlbanianRakija', 'BalkanRakija',
      'SerbianDistillers', 'N.MacedonianDistillers', 'AlbanianDistillers', 'BalkanDistillers',
      'PremiumRakija', 'OrganicRakija', 'AwardedRakija', 'Geo-ProtectedRakija',
      'BoutiqueDistilleries', 'FamilyDistilleries', 'GarageDistilleries',
      'Sljivovica/Plum', 'Viljamovka/Pear', 'Kajsijevaca/Apricot',
      'Malinovaca/Raspberry', 'Dunjevaca/Quince', 'Jabukovaca/Apple',
      'Visnjevaca/Cherry', 'Lozovaca/Grape', 'Orahovaca/Walnut',
      'Travarica/Herbal', 'Medovaca/Honey', 'RakijaTasting',
      'Rakija&FoodPairing', 'RakijaIndustry', 'RakijaTrading', 'Distilling',
      'RakijaMarketing', 'RakijaBranding', 'RakijaPackaging', 'DistillationEquipment'
    ],
    'DISTRIBUTION': [
      'WineDistributors', 'RakijaDistributors', 'FoodDistributors',
      'SerbianDistributors', 'N.MacedonianDistributors', 'AlbanianDistributors', 'BalkanDistributors',
      'OrganicGoodsDistribution', 'PremiumGoodsDistribution', 'BoutiqueBrandsDistribution',
      'DirectTrading', 'DistributionSourcing', 'SustainableDistribution',
      'VolumePricing', 'DistributionDelivery', 'DistributionLogistics', 'DistributionSupplyChain'
    ],
    'WHOLESALE': [
      'WineWholesalers', 'RakijaWholesalers', 'FoodWholesalers',
      'SerbianWholesalers', 'N.MacedonianWholesalers', 'AlbanianWholesalers', 'BalkanWholesalers',
      'OrganicGoodsWholesale', 'PremiumGoodsWholesale', 'DirectTrading',
      'WholesaleSourcing', 'SustainableWholesale', 'VolumePricing',
      'InventorySolutions', 'WholesaleDelivery', 'WholesaleLogistics', 'WholesaleSupplyChain'
    ],
    'RETAIL': [
      'WineRetailers', 'RakijaRetailers', 'FoodRetailers',
      'SerbianRetailers', 'N.MacedonianRetailers', 'AlbanianRetailers', 'BalkanRetailers',
      'OrganicGoodsRetail', 'PremiumGoodsRetail', 'BoutiqueBrandsRetail',
      'DirectTrading', 'RetailSourcing', 'Shelf-ReadySolutions',
      'SustainableRetail', 'VolumePricing', 'RetailDelivery', 'RetailLogistics', 'RetailSupplyChain'
    ],
    'HORECA': [
      'Horeca', 'Hospitality', 'Hotels', 'Restaurants', 'Cafés', 'Catering',
      'Wine&SpiritsTrends', 'GastroTrends', 'FineDiningExperience', 'AuthenticFlavors',
      'WineSelection', 'SpiritsSelection', 'FoodSelection', 'MenuInnovation',
      'MenuDevelopment', 'WineListCuration', 'HotelIndustry', 'HospitalityIndustry',
      'RestaurantIndustry', 'CateringIndustry', 'HorecaSuppliers', 'HorecaDistributors',
      'HorecaProfessionals', 'HorecaEquipment', 'Chefs', 'YoungChefs',
      'Chef-InspiredProducts', 'ChefCompetitions', 'ChefDemonstrations',
      'HospitalityProcurement', 'HospitalityManagement', 'HospitalitySolutions',
      'HospitalityEquipment', 'FutureOfHospitality', 'Wine&Hospitality',
      'Rakija&Hospitality', 'Food&Hospitality'
    ]
  };

  const handleInterestToggle = (interest: string) => {
    let updatedInterests;
    
    if (selectedInterests.includes(interest)) {
      updatedInterests = selectedInterests.filter(i => i !== interest);
    } else {
      updatedInterests = [...selectedInterests, interest];
    }
    
    setSelectedInterests(updatedInterests);
    onUpdateData?.({ wv_pointsOfInterest: updatedInterests });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Get profile-specific background color for the label section
  const getLabelBackgroundColor = () => {
    const profile = savedData?.wv_profileSelection;
    
    switch (profile) {
      case 'Exhibitor':
        return colors.v_dark; // Dark purple
      case 'Buyer':
        return colors.y; // Yellow
      case 'Visitor':
        return colors.r_dark; // Dark red
      default:
        return colors.c; // Default carbon
    }
  };

  const renderFilterTabs = () => (
    <View style={[
      tw`flex-row justify-center items-center py-4 px-4 border-b`,
      { backgroundColor: colors.w, borderBottomColor: colors.c_20 }
    ]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row gap-2`}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={tw`px-4 py-2`}
            onPress={() => handleFilterChange(filter)}
          >
            <Text style={[
              tw`text-sm uppercase`,
              { 
                color: colors.c,
                letterSpacing: 1,
                fontWeight: activeFilter === filter ? '700' : '400'
              }
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderTagButton = (tag: string) => {
    const isSelected = selectedInterests.includes(tag);
    
    return (
      <TouchableOpacity
        key={tag}
        style={[
          tw`px-3 py-2 rounded mb-2 mr-2`,
          {
            backgroundColor: isSelected ? colors.c_90 : colors.c_20,
            borderWidth: 1,
            borderColor: isSelected ? colors.c_90 : colors.c_20
          }
        ]}
        onPress={() => handleInterestToggle(tag)}
      >
        <Text style={[
          tw`text-sm font-medium text-center`,
          { color: isSelected ? colors.w : colors.c }
        ]}>
          {tag}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`px-6 pb-2`}>  
      {/* Header */}
      <StepHeader 
        title={headerTitle || 'Your interests'} 
        subtitle={headerSubtitle || 'PARTICIPATION • CHOOSE MULTIPLE OPTIONS'} 
      />
      
      {/* Input Section */}
      <View style={tw`mt-0`}>
        {/* Label */}
        <View style={[
          tw`rounded-t-lg px-8 py-4`,
          { backgroundColor: getLabelBackgroundColor() }
        ]}>
          <Text style={[
            tw`text-center text-sm font-medium`,
            { color: colors.w }
          ]}>
            What are your areas of interest?
          </Text>
        </View>
        
        {/* Filter Tabs */}
        {renderFilterTabs()}
        
        {/* Tags Container */}
        <View style={[
          tw`rounded-b-lg p-6`,
          { backgroundColor: colors.w, minHeight: 350 }
        ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={tw`flex-row flex-wrap`}>
              {tagGroups[activeFilter as keyof typeof tagGroups]?.map(tag => renderTagButton(tag))}
            </View>
          </ScrollView>
          
          {/* Selection Counter */}
          <View style={tw`mt-4 pt-4 border-t border-gray-200`}>
            <Text style={[
              tw`text-xs text-center`,
              { color: colors.c_50 }
            ]}>
              {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepPbStep5;
