import { FormFieldDefinition } from './formFields';
import {
  COMMON_FIELDS,
  COMPANY_FIELDS,
  PERSONAL_FIELDS,
  SOCIAL_FIELDS,
  EXHIBITOR_SPECIFIC_FIELDS,
  BUYER_SPECIFIC_FIELDS,
  VISITOR_SPECIFIC_FIELDS,
  FINANCIAL_FIELDS,
  COMMUNICATION_FIELDS,
} from './registrationFields';

// Profile-specific field collections
export const PROFILE_FIELD_COLLECTIONS = {
  Exhibitor: [
    ...COMMON_FIELDS,
    ...EXHIBITOR_SPECIFIC_FIELDS,
    ...COMPANY_FIELDS,
    ...FINANCIAL_FIELDS,
    ...SOCIAL_FIELDS,
    ...PERSONAL_FIELDS,
    ...COMMUNICATION_FIELDS,
  ],
  
  Buyer: [
    ...COMMON_FIELDS,
    ...BUYER_SPECIFIC_FIELDS,
    ...COMPANY_FIELDS,
    ...SOCIAL_FIELDS,
    ...PERSONAL_FIELDS,
    ...COMMUNICATION_FIELDS,
  ],
  
  Visitor: [
    ...COMMON_FIELDS,
    ...VISITOR_SPECIFIC_FIELDS,
    ...PERSONAL_FIELDS,
  ],
} as const;

// Field collections by section for easier management
export const FIELD_SECTIONS = {
  profile: 'Profile Selection',
  exhibitor: 'Exhibitor Information',
  buyer: 'Buyer Information', 
  visitor: 'Visitor Information',
  company: 'Company Information',
  personal: 'Personal Information',
  financial: 'Financial Information',
  social: 'Social Media',
  production: 'Production Details',
  communication: 'Communication Preferences',
  security: 'Security',
  media: 'Media Upload',
  terms: 'Terms & Conditions',
  final: 'Final Confirmation',
} as const;

// Get fields for a specific profile
export const getFieldsForProfile = (profile: 'Exhibitor' | 'Buyer' | 'Visitor'): FormFieldDefinition[] => {
  return [...(PROFILE_FIELD_COLLECTIONS[profile] || [])];
};

// Get fields by section
export const getFieldsBySection = (
  fields: FormFieldDefinition[], 
  section: string
): FormFieldDefinition[] => {
  return fields.filter(field => field.section === section);
};

// Get visible fields based on current data (conditional logic)
export const getVisibleFields = (
  fields: FormFieldDefinition[], 
  currentData: any
): FormFieldDefinition[] => {
  return fields.filter(field => {
    if (field.showWhen) {
      return field.showWhen(currentData);
    }
    return true;
  });
};

// Get required fields that are missing values
export const getMissingRequiredFields = (
  fields: FormFieldDefinition[], 
  currentData: any
): string[] => {
  const visibleFields = getVisibleFields(fields, currentData);
  const missing: string[] = [];
  
  visibleFields.forEach(field => {
    if (field.validation?.required) {
      const value = currentData?.[field.key];
      if (!value || (typeof value === 'string' && !value.trim())) {
        missing.push(field.key);
      }
    }
  });
  
  return missing;
};

// Validate a single field
export const validateField = (
  field: FormFieldDefinition, 
  value: any, 
  allData?: any
): string | null => {
  const validation = field.validation;
  if (!validation) return null;
  
  // Required validation
  if (validation.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'This field is required';
  }
  
  // Skip other validations if no value (and not required)
  if (!value || (typeof value === 'string' && !value.trim())) {
    return null;
  }
  
  // Length validations
  if (typeof value === 'string') {
    if (validation.minLength && value.length < validation.minLength) {
      return `Must be at least ${validation.minLength} characters`;
    }
    if (validation.maxLength && value.length > validation.maxLength) {
      return `Must be no more than ${validation.maxLength} characters`;
    }
  }
  
  // Pattern validation
  if (validation.pattern && typeof value === 'string' && !validation.pattern.test(value)) {
    return 'Invalid format';
  }
  
  // Custom validation
  if (validation.custom) {
    return validation.custom(value, allData);
  }
  
  return null;
};

// Validate all fields for a given data set
export const validateAllFields = (
  fields: FormFieldDefinition[], 
  data: any
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const visibleFields = getVisibleFields(fields, data);
  
  visibleFields.forEach(field => {
    const error = validateField(field, data?.[field.key], data);
    if (error) {
      errors[field.key] = error;
    }
  });
  
  return errors;
};

// Check if step can proceed (no validation errors for visible required fields)
export const canProceedWithStep = (
  fields: FormFieldDefinition[], 
  data: any, 
  stepFields?: string[]
): boolean => {
  const relevantFields = stepFields 
    ? fields.filter(f => stepFields.includes(f.key))
    : fields;
    
  const visibleFields = getVisibleFields(relevantFields, data);
  const errors = validateAllFields(visibleFields, data);
  
  return Object.keys(errors).length === 0;
};
