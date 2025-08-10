import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';
import { useRegistration } from '../RegistrationProvider';
import { theme } from '../../../theme';

const AddressStep: React.FC = () => {
  const { formData, updateField, formData: { errors } } = useRegistration();

  return (
    <View style={tw`gap-4`}>
      <Text style={theme.styles.typography.h2}>Address Details</Text>
      <Text style={[theme.styles.typography.body, tw`mb-4`]}>
        Please provide your location information.
      </Text>

      {/* Country */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Country *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.country ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.country}
          onChangeText={(text) => updateField('country', text)}
          placeholder="Enter your country"
          autoComplete="country"
        />
        {errors.country && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.country}</Text>
        )}
      </View>

      {/* City */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>City *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.city ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.city}
          onChangeText={(text) => updateField('city', text)}
          placeholder="Enter your city"
          autoComplete="address-line1"
        />
        {errors.city && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.city}</Text>
        )}
      </View>

      {/* Address */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Address</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.address ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.address}
          onChangeText={(text) => updateField('address', text)}
          placeholder="Enter your address (optional)"
          autoComplete="street-address"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        {errors.address && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.address}</Text>
        )}
      </View>
    </View>
  );
};

export default AddressStep;
