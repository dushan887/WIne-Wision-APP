import React, { useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { FormFieldDefinition, FieldType, SelectOption } from '../../utils/formFields';
import { validateField } from '../../utils/profileFields';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface FormFieldProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (key: string, value: any) => void;
  error?: string;
  allData?: any;
  disabled?: boolean;
}

interface FormSectionProps {
  title?: string;
  fields: FormFieldDefinition[];
  data: any;
  onChange: (key: string, value: any) => void;
  errors?: Record<string, string>;
  disabled?: boolean;
}

// Individual field component
export const FormField: React.FC<FormFieldProps> = ({ 
  field, 
  value, 
  onChange, 
  error, 
  allData,
  disabled = false 
}) => {
  const hasError = Boolean(error);
  
  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <TextInput
            style={[
              tw`border rounded-lg px-4 text-base`,
              {
                height: 48,
                lineHeight: 20,
                textAlignVertical: 'center',
                borderColor: hasError ? colors.r : colors.w,
                backgroundColor: colors.w,
                color: colors.c,
                opacity: disabled ? 0.6 : 1,
              }
            ]}
            value={value || ''}
            onChangeText={(text) => onChange(field.key, text)}
            placeholder={field.placeholder}
            placeholderTextColor={colors.c_50}
            keyboardType={field.type === 'email' ? 'email-address' : 'default'}
            editable={!disabled}
          />
        );
        
      case 'phone':
        return (
          <TextInput
            style={[
              tw`border rounded-lg px-4 text-base`,
              {
                height: 48,
                lineHeight: 20,
                textAlignVertical: 'center',
                borderColor: hasError ? colors.r : colors.w,
                backgroundColor: colors.w,
                color: colors.c,
                opacity: disabled ? 0.6 : 1,
              }
            ]}
            value={value || ''}
            onChangeText={(text) => onChange(field.key, text)}
            placeholder={field.placeholder}
            placeholderTextColor={colors.c_50}
            keyboardType="phone-pad"
            editable={!disabled}
          />
        );
        
      case 'textarea':
        return (
          <TextInput
            style={[
              tw`border rounded-lg px-4 py-3 text-base`,
              {
                minHeight: 100,
                textAlignVertical: 'top',
                borderColor: hasError ? colors.r : colors.w,
                backgroundColor: colors.w,
                color: colors.c,
                opacity: disabled ? 0.6 : 1,
              }
            ]}
            value={value || ''}
            onChangeText={(text) => onChange(field.key, text)}
            placeholder={field.placeholder}
            placeholderTextColor={colors.c_50}
            multiline
            editable={!disabled}
          />
        );
        
      case 'select':
        return (
          <View style={[
            tw`border rounded-lg`,
            {
              borderColor: hasError ? colors.r : colors.w,
              backgroundColor: colors.w,
              opacity: disabled ? 0.6 : 1,
            }
          ]}>
            <ScrollView style={tw`max-h-40`}>
              {field.options?.map((option: SelectOption) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    tw`px-4 py-3 flex-row items-center`,
                    { borderBottomWidth: 1, borderBottomColor: colors.c_10 }
                  ]}
                  onPress={() => !disabled && onChange(field.key, option.value)}
                  disabled={disabled || option.disabled}
                >
                  <View style={[
                    tw`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center`,
                    { borderColor: value === option.value ? colors.b : colors.c_30 }
                  ]}>
                    {value === option.value && (
                      <View style={[
                        tw`w-3 h-3 rounded-full`,
                        { backgroundColor: colors.b }
                      ]} />
                    )}
                  </View>
                  <Text style={[
                    tw`flex-1`,
                    { 
                      color: option.disabled ? colors.c_50 : colors.c,
                      opacity: disabled ? 0.6 : 1,
                    }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
        
      case 'radio':
        return (
          <View style={tw`gap-3`}>
            {field.options?.map((option: SelectOption) => (
              <TouchableOpacity
                key={option.value}
                style={tw`flex-row items-center`}
                onPress={() => !disabled && onChange(field.key, option.value)}
                disabled={disabled || option.disabled}
              >
                <View style={[
                  tw`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center`,
                  { borderColor: value === option.value ? colors.b : colors.c_30 }
                ]}>
                  {value === option.value && (
                    <View style={[
                      tw`w-3 h-3 rounded-full`,
                      { backgroundColor: colors.b }
                    ]} />
                  )}
                </View>
                <Text style={[
                  { 
                    color: option.disabled ? colors.c_50 : colors.c,
                    opacity: disabled ? 0.6 : 1,
                  }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
        
      case 'checkbox':
        return (
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => !disabled && onChange(field.key, !value)}
            disabled={disabled}
          >
            <View style={[
              tw`w-5 h-5 rounded border-2 mr-3 items-center justify-center`,
              { 
                borderColor: colors.w,
                backgroundColor: value ? colors.b : 'transparent',
                opacity: disabled ? 0.6 : 1,
              }
            ]}>
              {value && (
                <Text style={[
                  tw`text-xs font-bold`,
                  { color: colors.w }
                ]}>
                  ✓
                </Text>
              )}
            </View>
            <Text style={[
              tw`flex-1`,
              { 
                color: colors.w,
                opacity: disabled ? 0.6 : 1,
              }
            ]}>
              {field.label}
            </Text>
          </TouchableOpacity>
        );
        
      default:
        return (
          <Text style={{ color: colors.c_50 }}>
            Field type "{field.type}" not implemented
          </Text>
        );
    }
  };

  return (
    <View style={tw`mb-4`}>
      {field.type !== 'checkbox' && (
        <Text style={[
          tw`text-sm font-medium mb-2`,
          { color: colors.w }
        ]}>
          {field.label}
          {field.validation?.required && (
            <Text style={{ color: colors.r }}>*</Text>
          )}
        </Text>
      )}
      
      {renderInput()}
      
      {error && (
        <Text style={[
          tw`text-xs mt-1`,
          { color: colors.r }
        ]}>
          {error}
        </Text>
      )}
      
      {field.helpText && !error && (
        <Text style={[
          tw`text-xs mt-1`,
          { color: colors.w, opacity: 0.7 }
        ]}>
          {field.helpText}
        </Text>
      )}
    </View>
  );
};

// Form section component
export const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  fields, 
  data, 
  onChange, 
  errors = {},
  disabled = false 
}) => {
  const visibleFields = useMemo(() => {
    return fields.filter(field => {
      if (field.showWhen) {
        return field.showWhen(data);
      }
      return true;
    });
  }, [fields, data]);

  if (visibleFields.length === 0) {
    return null;
  }

  return (
    <View style={tw`mb-6`}>
      {title && (
        <Text style={[
          tw`text-lg font-semibold mb-4`,
          { color: colors.w }
        ]}>
          {title}
        </Text>
      )}
      
      {visibleFields.map((field) => (
        <FormField
          key={field.key}
          field={field}
          value={data?.[field.key]}
          onChange={onChange}
          error={errors[field.key]}
          allData={data}
          disabled={disabled}
        />
      ))}
    </View>
  );
};
