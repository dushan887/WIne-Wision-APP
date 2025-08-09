import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import apiClient from '../../api'; // Uncomment when API client is available

export interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  fields: string[]; // Field keys for this step
  headerTitle?: string; // Display title for the step header
  headerSubtitle?: string; // Display subtitle for the step header
}

export interface CommonData {
  wv_profileSelection: 'Exhibitor' | 'Buyer' | 'Visitor';
  wv_user_password: string;
  wv_password_confirm: string;
  terms_conditions: boolean;
  terms_conditions_final: boolean;
  wv_user_logo?: string; // base64
  wv_user_avatar?: string; // base64
}

export interface ExhibitorData extends CommonData {
  wv_fieldOfWork?: 'Wine' | 'Spirits' | 'Food';
  wv_participationModel?: 'Solo Exhibitor' | 'Head Exhibitor' | 'Co-Exhibitor';
  wv_userCategory?: string;
  wv_userCategoryOtherDescription?: string;
  wv_exhibitingProducts?: 'Yes' | 'No';
  wv_companyDescription?: string;
  wv_company_name?: string;
  wv_company_pobRegion?: string;
  wv_company_country?: string;
  wv_company_email?: string;
  wv_company_city?: string;
  wv_company_website?: string;
  wv_company_address?: string;
  wv_company_phone?: string;
  wv_annualProductionLiters?: string;
  wv_currentStockLiters?: string;
  wv_company_idRegistryNumber?: string;
  wv_company_vatRegistryNumber?: string;
  wv_company_iban?: string;
  wv_company_foreignBank?: string;
  wv_company_domesticBank?: string;
  wv_company_foreignAccountNumber?: string;
  wv_company_domesticAccountNumber?: string;
  wv_company_foreignSwift?: string;
  wv_company_domesticSwift?: string;
  wv_socInstagram?: string;
  wv_socLinkedin?: string;
  wv_socFacebook?: string;
  wv_socX?: string;
  wv_firstName?: string;
  wv_lastName?: string;
  wv_professionalOccupation?: string;
  wv_yearsOfExperience?: string;
  wv_nationality?: string;
  wv_email?: string;
  wv_positionInCompany?: string;
  wv_contactTelephone?: string;
  wv_exhibitor_rep_whatsapp?: boolean;
  wv_exhibitor_rep_viber?: boolean;
}

export interface BuyerData extends CommonData {
  wv_userCategory?: 'Importer' | 'Wholesaler' | 'Retailer' | 'HORECA' | 'Sales Agent' | 'Chamber of Commerce' | 'Export / Import' | 'Market Trends Analysis' | 'Business Consulting' | 'Sales and Marketing' | 'Industry Promotion' | 'Events Production' | 'Distributor' | 'Culture and Tourism' | 'Catering' | 'Other';
  wv_userCategoryOtherDescription?: string;
  wv_reasonsForVisiting?: string[];
  wv_otherReasonsForVisiting?: string;
  wv_pointsOfInterest?: string[];
  wv_companyDescription?: string;
  wv_company_name: string;
  wv_company_pobRegion?: string;
  wv_company_country: string;
  wv_company_email: string;
  wv_company_city: string;
  wv_company_website?: string;
  wv_company_address?: string;
  wv_company_phone: string;
  wv_governmentSupport?: boolean;
  wv_reasonForApplying?: string;
  wv_socInstagram?: string;
  wv_socLinkedin?: string;
  wv_socFacebook?: string;
  wv_socX?: string;
  wv_firstName: string;
  wv_lastName: string;
  wv_professionalOccupation?: string;
  wv_yearsOfExperience?: string;
  wv_nationality: string;
  wv_email: string;
  wv_positionInCompany?: string;
  wv_contactTelephone: string;
  wv_exhibitor_rep_whatsapp?: boolean;
  wv_exhibitor_rep_viber?: boolean;
}

export interface VisitorData extends CommonData {
  wv_participationModel?: 'Public Visitor' | 'Company';
  wv_pointsOfInterest: string[];
  wv_firstName: string;
  wv_lastName: string;
  wv_professionalOccupation?: string;
  wv_yearsOfExperience?: string;
  wv_nationality?: string;
  wv_email: string;
  wv_positionInCompany?: string;
  wv_contactTelephone?: string;
  wv_exhibitor_rep_whatsapp?: boolean;
  wv_exhibitor_rep_viber?: boolean;
  wv_company_country: string;
  wv_company_city: string;
}

export type RegistrationData = ExhibitorData | BuyerData | VisitorData;

const getStepsForProfile = (profile: 'Exhibitor' | 'Buyer' | 'Visitor'): RegistrationStep[] => {
  const commonSteps = [
    { id: 'photos-company', title: 'Company Logo', description: 'COMPANY LOGO PICTURE', fields: ['wv_user_logo'], headerTitle: 'Your company logo', headerSubtitle: 'Shown on your stand listing and event materials' },
    { id: 'photos-profile', title: 'Profile Avatar', description: 'PROFILE PICTURE', fields: ['wv_user_avatar'], headerTitle: 'Profile Avatar', headerSubtitle: ' Used for the personal badge and profile' },
    { id: 'password', title: 'Set Password', description: 'Create secure password', fields: ['wv_user_password', 'wv_password_confirm', 'terms_conditions'], headerTitle: 'Set Password', headerSubtitle: 'Create a secure password' },
    { id: 'final', title: 'Final Confirmation', description: 'Review and submit', fields: ['terms_conditions_final'], headerTitle: 'Final Confirmation', headerSubtitle: 'Review and submit your registration' },
  ];

  switch (profile) {
    case 'Exhibitor':
      return [
        { 
          id: 'start', 
          title: 'Profile Selection', 
          description: 'CHOOSE PROFILE', 
          fields: ['wv_profileSelection'], 
          headerTitle: 'Exhibitor, Pro-Buyer or Visitor?', 
          headerSubtitle: 'Choose single option' 
        },
        { 
          id: 'wv-ex-step-1', 
          title: 'Field of Work', 
          description: 'FIELD OF WORK', 
          fields: ['wv_fieldOfWork'], 
          headerTitle: 'Wine, Spirits or Food?', 
          headerSubtitle: 'CHOOSE SINGLE OPTION' 
        },
        { 
          id: 'wv-ex-step-2', 
          title: 'Participation Model', 
          description: 'PARTICIPATION MODEL', 
          fields: ['wv_participationModel'], 
          headerTitle: 'You are applying as:', 
          headerSubtitle: 'CHOOSE SINGLE OPTION' 
        },
        { 
          id: 'wv-ex-step-3', 
          title: 'User Category', 
          description: 'PROFESSIONAL ACTIVITIES CATEGORY', 
          fields: ['wv_userCategory'], 
          headerTitle: 'Select your category', 
          headerSubtitle: 'CHOOSE SINGLE OPTION' 
        },
        { 
          id: 'wv-ex-step-4', 
          title: 'Category Description', 
          description: 'PROFESSIONAL ACTIVITIES CATEGORY', 
          fields: ['wv_userCategoryOtherDescription'], 
          headerTitle: 'Describe your category', 
          headerSubtitle: 'IN WRITTEN WORDS, UP TO 200 CHARACTERS' 
        },
        { 
          id: 'wv-ex-step-5', 
          title: 'Exhibiting Products', 
          description: 'EXHIBITOR PRODUCTS', 
          fields: ['wv_exhibitingProducts'], 
          headerTitle: 'Are you exhibiting products?', 
          headerSubtitle: 'CHOOSE SINGLE OPTION' 
        },
        { 
          id: 'wv-ex-step-6', 
          title: 'Company Description', 
          description: 'COMPANY DESCRIPTION', 
          fields: ['wv_companyDescription'], 
          headerTitle: 'About your company', 
          headerSubtitle: 'IN WRITTEN WORDS, UP TO 700 CHARACTERS' 
        },
        { 
          id: 'wv-ex-step-7', 
          title: 'Company Details', 
          description: 'COMPANY CREDENTIALS', 
          fields: ['wv_company_name', 'wv_company_pobRegion', 'wv_company_country', 'wv_company_email', 'wv_company_city', 'wv_company_website', 'wv_company_address', 'wv_company_phone', 'wv_annualProductionLiters', 'wv_currentStockLiters'], 
          headerTitle: 'Your general information', 
          headerSubtitle: 'MARKED FIELDS (*) ARE COMPULSORY' 
        },
        { 
          id: 'wv-ex-step-8', 
          title: 'Financial Details', 
          description: 'COMPANY CREDENTIALS', 
          fields: ['wv_company_idRegistryNumber', 'wv_company_vatRegistryNumber', 'wv_company_iban', 'wv_company_foreignBank', 'wv_company_domesticBank', 'wv_company_foreignAccountNumber', 'wv_company_domesticAccountNumber', 'wv_company_foreignSwift', 'wv_company_domesticSwift'], 
          headerTitle: 'Your general information', 
          headerSubtitle: 'ALL FIELDS ARE OPTIONAL' 
        },
        { 
          id: 'wv-ex-step-9', 
          title: 'Social Media', 
          description: 'COMPANY CREDENTIALS', 
          fields: ['wv_socInstagram', 'wv_socLinkedin', 'wv_socFacebook', 'wv_socX'], 
          headerTitle: 'Your social networks', 
          headerSubtitle: 'ALL FIELDS ARE OPTIONAL' 
        },
        { 
          id: 'wv-ex-step-10', 
          title: 'Personal Details', 
          description: 'REPRESENTATIVE CREDENTIALS', 
          fields: ['wv_firstName', 'wv_lastName', 'wv_professionalOccupation', 'wv_yearsOfExperience', 'wv_nationality', 'wv_email', 'wv_positionInCompany', 'wv_contactTelephone', 'wv_exhibitor_rep_whatsapp', 'wv_exhibitor_rep_viber'], 
          headerTitle: 'Your representative at the fair', 
          headerSubtitle: 'MARKED FIELDS (*) ARE COMPULSORY' 
        },
        ...commonSteps,
      ];
    case 'Buyer':
      return [
        { 
          id: 'start', 
          title: 'Profile Selection', 
          description: 'CHOOSE PROFILE', 
          fields: ['wv_profileSelection'], 
          headerTitle: 'Exhibitor, Pro-Buyer or Visitor?', 
          headerSubtitle: 'Choose single option' 
        },
        { 
          id: 'wv-pb-step-1', 
          title: 'User Category', 
          description: 'PROFESSIONAL ACTIVITIES CATEGORY', 
          fields: ['wv_userCategory'], 
          headerTitle: 'Select your category', 
          headerSubtitle: 'CHOOSE SINGLE OPTION' 
        },
        { 
          id: 'wv-pb-step-2', 
          title: 'Category Description', 
          description: 'PROFESSIONAL ACTIVITIES CATEGORY', 
          fields: ['wv_userCategoryOtherDescription'], 
          headerTitle: 'Describe your category', 
          headerSubtitle: 'IN WRITTEN WORDS, UP TO 200 CHARACTERS' 
        },
        { 
          id: 'wv-pb-step-3', 
          title: 'Reasons for Visiting', 
          description: 'PARTICIPATION', 
          fields: ['wv_reasonsForVisiting'], 
          headerTitle: 'Taking part in WVOB25', 
          headerSubtitle: 'CHOOSE MULTIPLE OPTIONS' 
        },
        { 
          id: 'wv-pb-step-4', 
          title: 'Other Reasons', 
          description: 'PARTICIPATION', 
          fields: ['wv_otherReasonsForVisiting'], 
          headerTitle: 'Taking part in WVOB25', 
          headerSubtitle: 'IN WRITTEN WORDS, UP TO 200 CHARACTERS' 
        },
        { 
          id: 'wv-pb-step-5', 
          title: 'Points of Interest', 
          description: 'POINTS OF INTEREST', 
          fields: ['wv_pointsOfInterest'], 
          headerTitle: 'Points of interest', 
          headerSubtitle: 'CHOOSE MULTIPLE OPTIONS' 
        },
        { 
          id: 'wv-pb-step-6', 
          title: 'Company Description', 
          description: 'COMPANY DESCRIPTION', 
          fields: ['wv_companyDescription'], 
          headerTitle: 'About your company', 
          headerSubtitle: 'IN WRITTEN WORDS, UP TO 700 CHARACTERS' 
        },
        { 
          id: 'wv-pb-step-7', 
          title: 'Company Details', 
          description: 'COMPANY CREDENTIALS', 
          fields: ['wv_company_name', 'wv_company_pobRegion', 'wv_company_country', 'wv_company_email', 'wv_company_city', 'wv_company_website', 'wv_company_address', 'wv_company_phone', 'wv_governmentSupport'], 
          headerTitle: 'Your general information', 
          headerSubtitle: 'MARKED FIELDS (*) ARE COMPULSORY' 
        },
        { 
          id: 'wv-pb-step-8', 
          title: 'Reason for Applying', 
          description: 'WINE VISION HOSTED BUYERS PROGRAM', 
          fields: ['wv_reasonForApplying'], 
          headerTitle: 'Your reasons for applying', 
          headerSubtitle: 'IN WRITTEN WORDS, UP TO 300 CHARACTERS' 
        },
        { 
          id: 'wv-pb-step-9', 
          title: 'Social Media', 
          description: 'COMPANY CREDENTIALS', 
          fields: ['wv_socInstagram', 'wv_socLinkedin', 'wv_socFacebook', 'wv_socX'], 
          headerTitle: 'Your social networks', 
          headerSubtitle: 'ALL FIELDS ARE OPTIONAL' 
        },
        { 
          id: 'wv-pb-step-10', 
          title: 'Personal Details', 
          description: 'REPRESENTATIVE CREDENTIALS', 
          fields: ['wv_firstName', 'wv_lastName', 'wv_professionalOccupation', 'wv_yearsOfExperience', 'wv_nationality', 'wv_email', 'wv_positionInCompany', 'wv_contactTelephone', 'wv_exhibitor_rep_whatsapp', 'wv_exhibitor_rep_viber'], 
          headerTitle: 'Your representative at the fair', 
          headerSubtitle: 'MARKED FIELDS (*) ARE COMPULSORY' 
        },
        ...commonSteps,
      ];
    case 'Visitor':
      return [
        { 
          id: 'start', 
          title: 'Profile Selection', 
          description: 'CHOOSE PROFILE', 
          fields: ['wv_profileSelection'], 
          headerTitle: 'Exhibitor, Pro-Buyer or Visitor?', 
          headerSubtitle: 'Choose single option' 
        },
        { 
          id: 'wv-vs-step-1', 
          title: 'Participation Model', 
          description: 'PARTICIPATION MODEL', 
          fields: ['wv_participationModel'], 
          headerTitle: 'You are applying as:', 
          headerSubtitle: 'Choose Single Option' 
        },
        { 
          id: 'wv-vs-step-2', 
          title: 'Points of Interest', 
          description: 'POINTS OF INTEREST', 
          fields: ['wv_pointsOfInterest'], 
          headerTitle: 'What are you interested in?', 
          headerSubtitle: 'CHOOSE MULTIPLE OPTIONS' 
        },
        { 
          id: 'wv-vs-step-3', 
          title: 'Personal Details', 
          description: 'VISITOR CREDENTIALS', 
          fields: ['wv_firstName', 'wv_lastName', 'wv_professionalOccupation', 'wv_yearsOfExperience', 'wv_nationality', 'wv_email', 'wv_positionInCompany', 'wv_contactTelephone', 'wv_exhibitor_rep_whatsapp', 'wv_exhibitor_rep_viber', 'wv_company_country', 'wv_company_city'], 
          headerTitle: 'Your general information', 
          headerSubtitle: 'MARKED FIELDS (*) ARE COMPULSORY' 
        },
        ...commonSteps,
      ];
    default:
      return [];
  }
};

const getRequiredFieldsForProfile = (profile: 'Exhibitor' | 'Buyer' | 'Visitor'): string[] => {
  const commonRequired = [
    'wv_profileSelection',
    'wv_user_password',
    'wv_password_confirm',
    'terms_conditions',
    'terms_conditions_final'
  ];

  switch (profile) {
    case 'Exhibitor':
      return [
        ...commonRequired,
        'wv_firstName', 'wv_lastName', 'wv_email', 'wv_contactTelephone', 'wv_nationality'
      ];
    case 'Buyer':
      return [
        ...commonRequired,
        'wv_company_name', 'wv_company_country', 'wv_company_email', 'wv_company_city', 
        'wv_company_phone', 'wv_firstName', 'wv_lastName', 'wv_nationality', 'wv_email', 
        'wv_contactTelephone', 'wv_pointsOfInterest'
      ];
    case 'Visitor':
      return [
        ...commonRequired,
        'wv_firstName', 'wv_lastName', 'wv_email',
        'wv_company_country', 'wv_company_city', 'wv_pointsOfInterest'
      ];
    default:
      return commonRequired;
  }
};

export const getFieldType = (fieldName: string): 'text' | 'email' | 'password' | 'boolean' | 'select' | 'multiselect' | 'image' | 'textarea' => {
  if (fieldName.includes('email')) return 'email';
  if (fieldName.includes('password')) return 'password';
  if (fieldName.includes('terms') || fieldName.includes('whatsapp') || fieldName.includes('viber') || fieldName.includes('governmentSupport')) return 'boolean';
  if (fieldName === 'wv_user_logo' || fieldName === 'wv_user_avatar') return 'image';
  if (fieldName.includes('reasonsForVisiting') || fieldName.includes('pointsOfInterest')) return 'multiselect';
  if (fieldName.includes('Description') || fieldName.includes('reasonForApplying')) return 'textarea';
  if (fieldName === 'wv_profileSelection' || fieldName === 'wv_fieldOfWork' || fieldName === 'wv_participationModel' || fieldName === 'wv_userCategory' || fieldName === 'wv_exhibitingProducts') return 'select';
  return 'text';
};

export const useMultiStepRegistration = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    wv_profileSelection: '' as any, // No preselection - user must choose
    wv_user_password: '',
    wv_password_confirm: '',
    terms_conditions: false,
    terms_conditions_final: false,
    wv_pointsOfInterest: [],
    wv_reasonsForVisiting: [],
  } as RegistrationData);
  const [steps, setSteps] = useState<RegistrationStep[]>([
    { id: 'start', title: 'Profile Selection', description: 'CHOOSE PROFILE', fields: ['wv_profileSelection'], headerTitle: 'Exhibitor, Pro-Buyer or Visitor?', headerSubtitle: 'Choose single option' }
  ]);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  const updateData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data } as RegistrationData));
    if (data.wv_profileSelection) {
      setSteps(getStepsForProfile(data.wv_profileSelection));
      setCurrentStepIndex(0);
    }
  };

  const nextStep = (bypassValidation = false) => {
    if (currentStepIndex < steps.length - 1 && (bypassValidation || isStepValid(steps[currentStepIndex]))) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const pickImage = async (field: 'wv_user_logo' | 'wv_user_avatar') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      updateData({ [field]: `data:image/jpeg;base64,${result.assets[0].base64}` });
    }
  };

  const isStepValid = (step: RegistrationStep): boolean => {
    const stepValid = step.fields.every(field => {
      const value = (registrationData as any)[field];
      
      // Handle array fields
      if (field === 'wv_pointsOfInterest' || field === 'wv_reasonsForVisiting') {
        return Array.isArray(value) && value.length > 0;
      }
      
      // Required fields check (based on backend args and profile)
      const requiredFields = getRequiredFieldsForProfile(registrationData.wv_profileSelection);
      if (requiredFields.includes(field)) {
        return !!value;
      }
      
      return true;
    });

    // Check password confirmation only on password step
    if (step.fields.includes('wv_password_confirm')) {
      return stepValid && (registrationData.wv_user_password === registrationData.wv_password_confirm);
    }

    return stepValid;
  };

  const checkEmail = async (email: string) => {
    try {
      // Use apiClient to call /wv/v1/check_email { email }
      // const response = await apiClient.post('/wv/v1/check_email', { email });
      // setEmailAvailable(response.data.available);
      
      // For now, mock the response
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setEmailAvailable(true);
    } catch (error) {
      console.error('Email check failed:', error);
      setEmailAvailable(null);
    }
  };

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const canProceed = isStepValid(currentStep);

  return {
    currentStep,
    steps,
    currentStepIndex,
    registrationData,
    nextStep,
    prevStep,
    updateData,
    pickImage,
    canProceed,
    isFirstStep,
    isLastStep,
    checkEmail,
    emailAvailable,
  };
};
