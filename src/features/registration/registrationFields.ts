import { FormFieldDefinition, VALIDATION_PATTERNS, VALIDATORS } from './formFields';
import { COUNTRIES } from './countries';
import { PRODUCTION_RANGES } from './productionRanges';

// User categories for different profiles
export const EXHIBITOR_CATEGORIES = [
  { value: 'Winemaker', label: 'Winemaker' },
  { value: 'Distiller', label: 'Distiller' },
  { value: 'Food Producer', label: 'Food Producer' },
  { value: 'Importer', label: 'Importer' },
  { value: 'Wholesaler', label: 'Wholesaler' },
  { value: 'Distributor', label: 'Distributor' },
  { value: 'Other', label: 'Other' },
];

export const BUYER_CATEGORIES = [
  { value: 'Importer', label: 'Importer' },
  { value: 'Wholesaler', label: 'Wholesaler' },
  { value: 'Retailer', label: 'Retailer' },
  { value: 'HORECA', label: 'HORECA' },
  { value: 'Sales Agent', label: 'Sales Agent' },
  { value: 'Chamber of Commerce', label: 'Chamber of Commerce' },
  { value: 'Export / Import', label: 'Export / Import' },
  { value: 'Market Trends Analysis', label: 'Market Trends Analysis' },
  { value: 'Business Consulting', label: 'Business Consulting' },
  { value: 'Sales and Marketing', label: 'Sales and Marketing' },
  { value: 'Industry Promotion', label: 'Industry Promotion' },
  { value: 'Events Production', label: 'Events Production' },
  { value: 'Distributor', label: 'Distributor' },
  { value: 'Culture and Tourism', label: 'Culture and Tourism' },
  { value: 'Catering', label: 'Catering' },
  { value: 'Other', label: 'Other' },
];

// Common field definitions that are reused across profiles
export const COMMON_FIELDS: FormFieldDefinition[] = [
  // Profile Selection
  {
    key: 'wv_profileSelection',
    label: 'Profile Type',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'Exhibitor', label: 'Exhibitor' },
      { value: 'Buyer', label: 'Buyer' },
      { value: 'Visitor', label: 'Visitor' },
    ],
    section: 'profile',
  },

  // Password fields
  {
    key: 'wv_user_password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    validation: { 
      required: true,
      custom: VALIDATORS.password 
    },
    section: 'security',
    helpText: 'Minimum 10 characters with capital letters and numbers',
  },
  {
    key: 'wv_password_confirm',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Re-enter your password',
    validation: { 
      required: true,
      custom: VALIDATORS.passwordConfirm
    },
    section: 'security',
    dependsOn: 'wv_user_password',
  },

  // Terms
  {
    key: 'terms_conditions',
    label: 'Accept Terms and Conditions',
    type: 'checkbox',
    validation: { required: true },
    section: 'terms',
    showWhen: (data) => data?.wv_profileSelection === 'Exhibitor',
  },
  {
    key: 'terms_conditions_final',
    label: 'Final Terms Acceptance',
    type: 'checkbox',
    validation: { required: true },
    section: 'final',
  },

  // Images
  {
    key: 'wv_user_logo',
    label: 'Company Logo',
    type: 'image',
    section: 'media',
    description: 'Upload your company logo (max 10MB)',
  },
  {
    key: 'wv_user_avatar',
    label: 'Profile Picture',
    type: 'image',
    section: 'media',
    description: 'Upload your profile picture (max 10MB)',
  },
];

// Company information fields (shared between Exhibitor and Buyer)
export const COMPANY_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_company_name',
    label: 'Official company name in English',
    type: 'text',
    placeholder: 'Enter company name',
    validation: { required: true, maxLength: 255 },
    section: 'company',
  },
  {
    key: 'wv_company_country',
    label: 'Country',
    type: 'country',
    validation: { required: true },
    options: COUNTRIES.map(country => ({ value: country, label: country })),
    section: 'company',
  },
  {
    key: 'wv_company_pobRegion',
    label: 'Region/State',
    type: 'text',
    placeholder: 'Enter region or state',
    section: 'company',
  },
  {
    key: 'wv_company_city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter city',
    validation: { required: true },
    section: 'company',
  },
  {
    key: 'wv_company_address',
    label: 'Address',
    type: 'text',
    placeholder: 'Enter full address',
    section: 'company',
  },
  {
    key: 'wv_company_email',
    label: 'Company Email',
    type: 'email',
    placeholder: 'company@example.com',
    validation: { 
      required: true,
      custom: VALIDATORS.email 
    },
    section: 'company',
  },
  {
    key: 'wv_company_phone',
    label: 'Phone Number',
    type: 'phone',
    placeholder: '+1 234 567 8900',
    validation: { required: true },
    section: 'company',
  },
  {
    key: 'wv_company_website',
    label: 'Website',
    type: 'text',
    placeholder: 'https://www.example.com',
    validation: {
      pattern: VALIDATION_PATTERNS.website
    },
    section: 'company',
  },
];

// Personal information fields
export const PERSONAL_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    validation: { required: true },
    section: 'personal',
  },
  {
    key: 'wv_lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    validation: { required: true },
    section: 'personal',
  },
  {
    key: 'wv_email',
    label: 'Personal Email',
    type: 'email',
    placeholder: 'your@email.com',
    validation: { 
      required: true,
      custom: VALIDATORS.email 
    },
    section: 'personal',
  },
  {
    key: 'wv_contactTelephone',
    label: 'Contact Phone',
    type: 'phone',
    placeholder: '+1 234 567 8900',
    validation: { required: true },
    section: 'personal',
  },
  {
    key: 'wv_nationality',
    label: 'Nationality',
    type: 'country',
    validation: { required: true },
    options: COUNTRIES.map(country => ({ value: country, label: country })),
    section: 'personal',
  },
  {
    key: 'wv_professionalOccupation',
    label: 'Professional Occupation',
    type: 'text',
    placeholder: 'Enter your occupation',
    section: 'personal',
  },
  {
    key: 'wv_positionInCompany',
    label: 'Position in Company',
    type: 'text',
    placeholder: 'Enter your position',
    section: 'personal',
  },
  {
    key: 'wv_yearsOfExperience',
    label: 'Years of Experience',
    type: 'select',
    options: [
      { value: '0-2', label: '0-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '6-10', label: '6-10 years' },
      { value: '11-15', label: '11-15 years' },
      { value: '16-20', label: '16-20 years' },
      { value: '20+', label: '20+ years' },
    ],
    section: 'personal',
  },
];

// Social media fields
export const SOCIAL_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_socInstagram',
    label: 'Instagram',
    type: 'text',
    placeholder: '@username or full URL',
    section: 'social',
  },
  {
    key: 'wv_socLinkedin',
    label: 'LinkedIn',
    type: 'text',
    placeholder: 'LinkedIn profile URL',
    section: 'social',
  },
  {
    key: 'wv_socFacebook',
    label: 'Facebook',
    type: 'text',
    placeholder: 'Facebook page URL',
    section: 'social',
  },
  {
    key: 'wv_socX',
    label: 'X (Twitter)',
    type: 'text',
    placeholder: '@username or full URL',
    section: 'social',
  },
];

// Exhibitor-specific fields
export const EXHIBITOR_SPECIFIC_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_fieldOfWork',
    label: 'Field of Work',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'Wine', label: 'Wine' },
      { value: 'Spirits', label: 'Spirits' },
      { value: 'Food', label: 'Food' },
    ],
    section: 'exhibitor',
  },
  {
    key: 'wv_participationModel',
    label: 'Participation Model',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'Solo Exhibitor', label: 'Solo Exhibitor' },
      { value: 'Head Exhibitor', label: 'Head Exhibitor' },
      { value: 'Co-Exhibitor', label: 'Co-Exhibitor' },
    ],
    section: 'exhibitor',
  },
  {
    key: 'wv_userCategory',
    label: 'Business Category',
    type: 'select',
    validation: { required: true },
    options: EXHIBITOR_CATEGORIES,
    section: 'exhibitor',
  },
  {
    key: 'wv_userCategoryOtherDescription',
    label: 'Other Category Description',
    type: 'textarea',
    placeholder: 'Please describe your business category',
    showWhen: (data) => data?.wv_userCategory === 'Other',
    validation: { 
      required: true,
      maxLength: 500 
    },
    section: 'exhibitor',
  },
  {
    key: 'wv_exhibitingProducts',
    label: 'Will you be exhibiting products?',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    section: 'exhibitor',
  },
  {
    key: 'wv_companyDescription',
    label: 'Company Description',
    type: 'textarea',
    placeholder: 'Describe your company and products (max 700 characters)',
    validation: { 
      required: true,
      maxLength: 700 
    },
    section: 'exhibitor',
  },
  // Production fields (conditional)
  {
    key: 'wv_annualProductionLiters',
    label: 'Annual Production (Liters)',
    type: 'select',
    options: PRODUCTION_RANGES.map(range => ({ 
      value: range.value, 
      label: range.label 
    })),
    showWhen: (data) => {
      const category = data?.wv_userCategory || '';
      return category.includes('Winemaker') || category.includes('Distiller');
    },
    section: 'production',
  },
  {
    key: 'wv_currentStockLiters',
    label: 'Current Stock (Liters)',
    type: 'select',
    options: PRODUCTION_RANGES.map(range => ({ 
      value: range.value, 
      label: range.label 
    })),
    showWhen: (data) => {
      const category = data?.wv_userCategory || '';
      return category.includes('Winemaker') || category.includes('Distiller');
    },
    section: 'production',
  },
];

// Financial fields (exhibitor only)
export const FINANCIAL_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_company_idRegistryNumber',
    label: 'ID Registry Number',
    type: 'text',
    placeholder: 'Enter registry number',
    section: 'financial',
  },
  {
    key: 'wv_company_vatRegistryNumber',
    label: 'VAT Registry Number',
    type: 'text',
    placeholder: 'Enter VAT number',
    section: 'financial',
  },
  {
    key: 'wv_company_iban',
    label: 'IBAN',
    type: 'text',
    placeholder: 'Enter IBAN',
    validation: {
      pattern: VALIDATION_PATTERNS.iban
    },
    section: 'financial',
  },
  // Banking fields would go here...
];

// Buyer-specific fields
export const BUYER_SPECIFIC_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_userCategory',
    label: 'Business Category',
    type: 'select',
    validation: { required: true },
    options: BUYER_CATEGORIES,
    section: 'buyer',
  },
  {
    key: 'wv_userCategoryOtherDescription',
    label: 'Other Category Description',
    type: 'textarea',
    placeholder: 'Please describe your business category',
    showWhen: (data) => data?.wv_userCategory === 'Other',
    validation: { 
      required: true,
      maxLength: 500 
    },
    section: 'buyer',
  },
  {
    key: 'wv_reasonsForVisiting',
    label: 'Reasons for Visiting',
    type: 'multiselect',
    validation: { required: true },
    options: [
      { value: 'sourcing', label: 'Product Sourcing' },
      { value: 'networking', label: 'Networking' },
      { value: 'education', label: 'Education & Learning' },
      { value: 'trends', label: 'Market Trends' },
      { value: 'partnerships', label: 'Business Partnerships' },
    ],
    section: 'buyer',
  },
  {
    key: 'wv_governmentSupport',
    label: 'Government Support',
    type: 'checkbox',
    section: 'buyer',
  },
  {
    key: 'wv_reasonForApplying',
    label: 'Reason for Applying',
    type: 'textarea',
    placeholder: 'Why are you applying to join the program?',
    validation: { maxLength: 1000 },
    section: 'buyer',
  },
];

// Visitor-specific fields  
export const VISITOR_SPECIFIC_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_participationModel',
    label: 'Participation Type',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'Public Visitor', label: 'Public Visitor' },
      { value: 'Company', label: 'Company Representative' },
    ],
    section: 'visitor',
  },
];

// Communication preferences
export const COMMUNICATION_FIELDS: FormFieldDefinition[] = [
  {
    key: 'wv_exhibitor_rep_whatsapp',
    label: 'WhatsApp',
    type: 'checkbox',
    section: 'communication',
  },
  {
    key: 'wv_exhibitor_rep_viber',
    label: 'Viber',
    type: 'checkbox',
    section: 'communication',
  },
];
