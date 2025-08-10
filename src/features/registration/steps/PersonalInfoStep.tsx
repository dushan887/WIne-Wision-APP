import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';
import { useRegistration } from '../RegistrationProvider';
import { theme } from '../../../theme';

const PersonalInfoStep: React.FC = () => {
  const { formData, updateField, formData: { errors } } = useRegistration();

  return (
    <View style={tw`gap-4`}>
      <Text style={theme.styles.typography.h2}>Personal Information</Text>
      <Text style={[theme.styles.typography.body, tw`mb-4`]}>
        Please provide your basic information to get started.
      </Text>

      {/* First Name */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>First Name *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.firstName ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.firstName}
          onChangeText={(text) => updateField('firstName', text)}
          placeholder="Enter your first name"
          autoCapitalize="words"
          autoComplete="given-name"
        />
        {errors.firstName && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.firstName}</Text>
        )}
      </View>

      {/* Last Name */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Last Name *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.lastName ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.lastName}
          onChangeText={(text) => updateField('lastName', text)}
          placeholder="Enter your last name"
          autoCapitalize="words"
          autoComplete="family-name"
        />
        {errors.lastName && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.lastName}</Text>
        )}
      </View>

      {/* Email */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Email Address *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.email ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.email}
          onChangeText={(text) => updateField('email', text.toLowerCase())}
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
        />
        {errors.email && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.email}</Text>
        )}
      </View>

      {/* Phone */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Phone Number *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.phone ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.phone}
          onChangeText={(text) => updateField('phone', text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          autoComplete="tel"
        />
        {errors.phone && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.phone}</Text>
        )}
      </View>
    </View>
  );
};

export default PersonalInfoStep;
