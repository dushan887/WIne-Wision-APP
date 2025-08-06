import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Button } from '../../components/common';

type ComingSoonScreenNavigationProp = StackNavigationProp<any, 'ComingSoon'>;

interface Props {
  navigation: ComingSoonScreenNavigationProp;
}

export const ComingSoonScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 bg-white justify-center items-center px-6`}>
      <View style={tw`items-center`}>
        {/* Icon placeholder */}
        <View style={tw`w-24 h-24 bg-wine-100 rounded-full items-center justify-center mb-6`}>
          <Text style={tw`text-wine-600 text-4xl`}>🚧</Text>
        </View>

        <Text style={tw`text-3xl font-bold text-wine-800 mb-4 text-center`}>
          Coming Soon
        </Text>

        <Text style={tw`text-gray-600 text-center text-lg leading-6 mb-8`}>
          This feature is currently under development and will be available soon.
          We're working hard to bring you the best experience possible.
        </Text>

        <View style={tw`bg-wine-50 rounded-lg p-4 mb-8`}>
          <Text style={tw`text-wine-700 text-center font-medium mb-2`}>
            Expected features:
          </Text>
          <Text style={tw`text-wine-600 text-center`}>
            • Event Calendar{'\n'}
            • Meeting Scheduler{'\n'}
            • Live Chat{'\n'}
            • Interactive Maps
          </Text>
        </View>

        <Button
          title="Go Back"
          onPress={handleGoBack}
          variant="primary"
          size="large"
        />

        <Text style={tw`text-gray-500 text-center mt-6 text-sm`}>
          Stay tuned for updates!
        </Text>
      </View>
    </View>
  );
};
