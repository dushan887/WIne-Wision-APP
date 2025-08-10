import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';
import { useRegistration } from '../RegistrationProvider';
import { theme } from '../../../theme';

const PasswordStep: React.FC = () => {
  const { formData, updateField, formData: { errors } } = useRegistration();

  return (
    <View style={tw`gap-4`}>
      <Text style={theme.styles.typography.h2}>Create Password</Text>
      <Text style={[theme.styles.typography.body, tw`mb-4`]}>
        Choose a secure password for your account.
      </Text>

      {/* Password */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Password *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.password ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.password}
          onChangeText={(text) => updateField('password', text)}
          placeholder="Enter your password"
          secureTextEntry
          autoComplete="new-password"
        />
        {errors.password && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.password}</Text>
        )}
        <Text style={[tw`mt-1 text-sm`, { color: theme.colors.carbon[50] }]}>
          Password must be at least 8 characters long
        </Text>
      </View>

      {/* Confirm Password */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Confirm Password *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.confirmPassword ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.confirmPassword}
          onChangeText={(text) => updateField('confirmPassword', text)}
          placeholder="Confirm your password"
          secureTextEntry
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.confirmPassword}</Text>
        )}
      </View>
    </View>
  );
};

export default PasswordStep;
