import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import { Card } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface ExhibitorCardProps {
  name: string;
  description: string;
  logo?: string;
  booth?: string;
  category?: string;
  onPress?: () => void;
}

export const ExhibitorCard: React.FC<ExhibitorCardProps> = ({
  name,
  description,
  logo,
  booth,
  category,
  onPress,
}) => {
  return (
    <Card onPress={onPress} variant="elevated">
      <View style={tw`flex-row`}>
        {logo && (
          <Image
            source={{ uri: logo }}
            style={tw`w-16 h-16 rounded-lg mr-4`}
            resizeMode="cover"
          />
        )}
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-lg text-gray-900 mb-1`}>
            {name}
          </Text>
          {category && (
            <Text style={[tw`text-sm font-medium mb-1`, { color: colors['wine-red'] }]}>
              {category}
            </Text>
          )}
          {booth && (
            <Text style={tw`text-gray-600 text-sm mb-2`}>
              Booth: {booth}
            </Text>
          )}
          <Text style={tw`text-gray-700 text-sm`} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>
    </Card>
  );
};
