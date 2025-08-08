import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepHeaderProps {
  title: string;
  subtitle: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={tw`mb-6`}>
      <Text style={[tw`text-2xl font-bold text-center mb-2`, { color: colors.w }]}>
        {title}
      </Text>
      <Text style={[tw`text-sm text-center uppercase`, { color: colors.c }]}>
        {subtitle}
      </Text>
    </View>
  );
};

export default StepHeader;
