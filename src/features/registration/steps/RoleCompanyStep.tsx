import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useRegistration } from '../RegistrationProvider';
import { theme } from '../../../theme';

const RoleCompanyStep: React.FC = () => {
  const { formData, updateField, formData: { errors } } = useRegistration();

  const roles = [
    { id: 'exhibitor', label: 'Exhibitor', description: 'I am showcasing products/services' },
    { id: 'buyer', label: 'Buyer', description: 'I am looking to purchase' },
    { id: 'visitor', label: 'Visitor', description: 'I am attending to learn' },
  ];

  return (
    <View style={tw`gap-4`}>
      <Text style={theme.styles.typography.h2}>Role & Company</Text>
      <Text style={[theme.styles.typography.body, tw`mb-4`]}>
        Tell us about your role and company.
      </Text>

      {/* Role Selection */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-3`]}>Your Role *</Text>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            onPress={() => updateField('role', role.id)}
            style={[
              tw`p-4 rounded-lg border mb-2`,
              {
                backgroundColor: formData.role === role.id ? theme.colors.velvet[10] : theme.colors.white,
                borderColor: formData.role === role.id ? theme.colors.velvet.base : theme.colors.carbon[20],
              },
            ]}
          >
            <Text style={[theme.styles.typography.h4, tw`mb-1`]}>{role.label}</Text>
            <Text style={theme.styles.typography.bodySmall}>{role.description}</Text>
          </TouchableOpacity>
        ))}
        {errors.role && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.role}</Text>
        )}
      </View>

      {/* Company Name */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Company Name *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.companyName ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.companyName}
          onChangeText={(text) => updateField('companyName', text)}
          placeholder="Enter your company name"
          autoComplete="organization"
        />
        {errors.companyName && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.companyName}</Text>
        )}
      </View>

      {/* Job Title */}
      <View>
        <Text style={[theme.styles.typography.h4, tw`mb-2`]}>Job Title *</Text>
        <TextInput
          style={[
            tw`p-4 rounded-lg border`,
            { backgroundColor: theme.colors.white },
            { borderColor: errors.jobTitle ? theme.colors.red : theme.colors.carbon[20] },
          ]}
          value={formData.jobTitle}
          onChangeText={(text) => updateField('jobTitle', text)}
          placeholder="Enter your job title"
          autoComplete="organization-title"
        />
        {errors.jobTitle && (
          <Text style={[tw`mt-1 text-sm`, { color: theme.colors.red }]}>{errors.jobTitle}</Text>
        )}
      </View>
    </View>
  );
};

export default RoleCompanyStep;
