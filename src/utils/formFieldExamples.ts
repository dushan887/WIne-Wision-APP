// Example of how to use the new form field utilities in registration and profile editing

import { 
  getFieldsForProfile, 
  validateAllFields, 
  canProceedWithStep,
  getVisibleFields,
  getMissingRequiredFields 
} from '../utils/profileFields';
import { 
  EXHIBITOR_SPECIFIC_FIELDS, 
  BUYER_SPECIFIC_FIELDS, 
  VISITOR_SPECIFIC_FIELDS,
  COMMON_FIELDS,
  COMPANY_FIELDS,
  PERSONAL_FIELDS 
} from '../utils/registrationFields';
import { FormFieldDefinition } from '../utils/formFields';

// Example 1: Get fields for a specific profile
export const getRegistrationFields = (profile: 'Exhibitor' | 'Buyer' | 'Visitor'): FormFieldDefinition[] => {
  return getFieldsForProfile(profile);
};

// Example 2: Validate form data
export const validateFormData = (profile: 'Exhibitor' | 'Buyer' | 'Visitor', data: any) => {
  const fields = getFieldsForProfile(profile);
  const errors = validateAllFields(fields, data);
  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};

// Example 3: Check if a step can proceed
export const checkStepCompletion = (profile: 'Exhibitor' | 'Buyer' | 'Visitor', stepFields: string[], data: any): boolean => {
  const fields = getFieldsForProfile(profile);
  return canProceedWithStep(fields, data, stepFields);
};

// Example 4: Get visible fields (with conditional logic)
export const getVisibleFieldsForStep = (profile: 'Exhibitor' | 'Buyer' | 'Visitor', data: any) => {
  const fields = getFieldsForProfile(profile);
  return getVisibleFields(fields, data);
};

// Example 5: Usage in a registration step component
export const useFormFields = (profile: 'Exhibitor' | 'Buyer' | 'Visitor', stepFields: string[]) => {
  const allFields = getFieldsForProfile(profile);
  
  // Filter fields for this step
  const currentStepFields = allFields.filter(field => 
    stepFields.includes(field.key)
  );
  
  return currentStepFields;
};

// Example 6: Profile editing usage (same utilities!)
export const useProfileEditingFields = (profile: 'Exhibitor' | 'Buyer' | 'Visitor') => {
  // Same field definitions can be reused for profile editing
  const fields = getFieldsForProfile(profile);
  
  // Could filter out certain fields not editable after registration
  const editableFields = fields.filter(field => 
    field.key !== 'email' // example: email not editable
  );
  
  return editableFields;
};

// Example 7: Step-by-step field organization
export const organizeFieldsByStep = (profile: 'Exhibitor' | 'Buyer' | 'Visitor') => {
  const fields = getFieldsForProfile(profile);
  
  const steps = {
    basic: fields.filter(f => ['firstName', 'lastName', 'email', 'phone'].includes(f.key)),
    company: fields.filter(f => ['companyName', 'website', 'businessCategory'].includes(f.key)),
    details: fields.filter(f => !['firstName', 'lastName', 'email', 'phone', 'companyName', 'website', 'businessCategory'].includes(f.key))
  };
  
  return steps;
};

// Example 8: Direct access to field collections
export const getFieldCollections = () => ({
  common: COMMON_FIELDS,
  company: COMPANY_FIELDS,
  personal: PERSONAL_FIELDS,
  exhibitorSpecific: EXHIBITOR_SPECIFIC_FIELDS,
  buyerSpecific: BUYER_SPECIFIC_FIELDS,
  visitorSpecific: VISITOR_SPECIFIC_FIELDS
});

// Example 9: Check what fields are missing for completion
export const checkMissingFields = (profile: 'Exhibitor' | 'Buyer' | 'Visitor', data: any) => {
  const fields = getFieldsForProfile(profile);
  return getMissingRequiredFields(fields, data);
};
