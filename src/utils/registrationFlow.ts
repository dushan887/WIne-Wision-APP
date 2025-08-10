/**
 * Registration Flow Navigation System
 * Wine Vision App - Handles dynamic step transitions based on user input
 * Mirrors the WordPress PHP logic for consistent behavior
 */

import { REGISTRATION_STEPS } from './registrationNotifications';

export interface StepConfig {
  file?: string; // For React Native, this would be component identifier
  component?: string; // Component name to render
  conditionField?: string | false;
  nextForm?: string | Array<[string, string]>;
  required: string[];
  requiredIf?: Array<{
    when: { field: string; in: string[] };
    fields: string[];
  }>;
}

export interface RegistrationSession {
  [key: string]: any;
  wv_reg_path?: string[];
  coex_token?: string;
  coex_email?: string;
  coex_exhibitor_id?: number;
  wv_temp_folder?: string;
}

/**
 * Registration steps configuration for different user flows
 * This mirrors the WordPress get_steps_config() method
 */
export const getStepsConfig = (): Record<string, StepConfig> => {
  return {
    // Global Step 1 (Pick Exhibitor / Buyer / Visitor)
    '1': {
      component: 'ProfileSelectionStep',
      conditionField: 'wv_profileSelection',
      nextForm: [
        ['Exhibitor', 'wv-ex-step-1'],
        ['Buyer', 'wv-pb-step-1'],
        ['Visitor', 'wv-vs-step-1'],
      ],
      required: ['wv_profileSelection'],
    },

    // EXHIBITOR FLOW
    // Wine, Spirits or Food? (wv_fieldOfWork)
    'wv-ex-step-1': {
      component: 'ExhibitorFieldOfWorkStep',
      conditionField: 'wv_fieldOfWork',
      nextForm: [
        ['Wine', 'wv-ex-step-2'],
        ['Spirits', 'wv-ex-step-3'],
        ['Food', 'wv-ex-step-3'],
      ],
      required: ['wv_fieldOfWork'],
    },

    // You are applying as: (wv_participationModel)
    'wv-ex-step-2': {
      component: 'ExhibitorParticipationModelStep',
      conditionField: 'wv_participationModel',
      nextForm: [
        ['prev:wv-ex-step-1:Wine', 'wv-ex-step-3'],
        ['prev:wv-ex-step-1:Spirits', 'wv-ex-step-4'],
        ['prev:wv-ex-step-1:Food', 'wv-ex-step-4'],
      ],
      required: ['wv_participationModel'],
    },

    'wv-ex-step-3': {
      component: 'ExhibitorUserCategoryStep',
      conditionField: 'wv_userCategory',
      nextForm: [
        ['includes:Other', 'wv-ex-step-4'],
        ['default', 'wv-ex-step-5'],
      ],
      required: ['wv_userCategory'],
    },

    'wv-ex-step-4': {
      component: 'ExhibitorOtherCategoryStep',
      conditionField: false,
      nextForm: 'wv-ex-step-5',
      required: ['wv_userCategoryOtherDescription'],
    },

    'wv-ex-step-5': {
      component: 'ExhibitorProductsStep',
      conditionField: false,
      nextForm: 'wv-ex-step-6',
      required: ['wv_exhibitingProducts'],
    },

    'wv-ex-step-6': {
      component: 'ExhibitorCompanyDescriptionStep',
      conditionField: false,
      nextForm: 'wv-ex-step-7',
      required: ['wv_companyDescription'],
    },

    'wv-ex-step-7': {
      component: 'ExhibitorCompanyInfoStep',
      conditionField: false,
      nextForm: 'wv-ex-step-8',
      required: [
        'wv_company_name',
        'wv_company_pobRegion',
        'wv_company_country',
        'wv_company_email',
        'wv_company_city',
        'wv_company_address',
        'wv_company_phone'
      ],
      requiredIf: [
        {
          when: {
            field: 'wv_userCategory',
            in: ['Winemaker', 'Winemaker & Distiller', 'Distiller']
          },
          fields: ['wv_annualProductionLiters'],
        },
      ],
    },

    'wv-ex-step-8': {
      component: 'ExhibitorCompanyRegistrationStep',
      conditionField: false,
      nextForm: 'wv-ex-step-9',
      required: [
        // 'wv_company_idRegistryNumber', // Commented out in PHP
        'wv_company_vatRegistryNumber',
        // 'wv_company_iban', // Commented out in PHP
        // 'wv_company_foreignBank', // Commented out in PHP
        // 'wv_company_domesticBank', // Commented out in PHP
        // 'wv_company_foreignAccountNumber', // Commented out in PHP
        // 'wv_company_domesticAccountNumber', // Commented out in PHP
        // 'wv_company_foreignSwift', // Commented out in PHP
        // 'wv_company_domesticSwift', // Commented out in PHP
      ],
    },

    'wv-ex-step-9': {
      component: 'ExhibitorSocialsStep',
      conditionField: false,
      nextForm: 'wv-ex-step-10',
      required: [],
    },

    'wv-ex-step-10': {
      component: 'ExhibitorPersonalInfoStep',
      conditionField: false,
      nextForm: 'wv-g-photo-company',
      required: [
        'wv_firstName',
        'wv_lastName',
        'wv_nationality',
        'wv_email',
        'wv_positionInCompany',
        'wv_contactTelephone',
      ],
    },

    // BUYER FLOW
    'wv-pb-step-1': {
      component: 'BuyerUserCategoryStep',
      conditionField: 'wv_userCategory',
      nextForm: [
        ['includes:Other', 'wv-pb-step-2'],
        ['default', 'wv-pb-step-3'],
      ],
      required: ['wv_userCategory'],
    },

    'wv-pb-step-2': {
      component: 'BuyerOtherCategoryStep',
      conditionField: false,
      nextForm: 'wv-pb-step-3',
      required: ['wv_userCategoryOtherDescription'],
    },

    'wv-pb-step-3': {
      component: 'BuyerReasonsForVisitingStep',
      conditionField: 'wv_reasonsForVisiting',
      nextForm: [
        ['includes:None of the Above', 'wv-pb-step-4'],
        ['default', 'wv-pb-step-5'],
      ],
      required: ['wv_reasonsForVisiting[]'],
    },

    'wv-pb-step-4': {
      component: 'BuyerOtherReasonsStep',
      conditionField: false,
      nextForm: 'wv-pb-step-5',
      required: ['wv_otherReasonsForVisiting'],
    },

    'wv-pb-step-5': {
      component: 'BuyerPointsOfInterestStep',
      conditionField: false,
      nextForm: 'wv-pb-step-6',
      required: ['wv_pointsOfInterest[]'],
    },

    'wv-pb-step-6': {
      component: 'BuyerCompanyDescriptionStep',
      conditionField: false,
      nextForm: 'wv-pb-step-7',
      required: ['wv_companyDescription'],
    },

    'wv-pb-step-7': {
      component: 'BuyerCompanyInfoStep',
      conditionField: 'wv_governmentSupport',
      nextForm: [
        ['on', 'wv-pb-step-8'],
        ['default', 'wv-pb-step-9'],
      ],
      required: [
        'wv_company_name',
        // 'wv_company_pobRegion', // Commented out in PHP
        'wv_company_country',
        'wv_company_email',
        'wv_company_city',
        // 'wv_company_address', // Commented out in PHP  
        'wv_company_phone'
      ],
    },

    'wv-pb-step-8': {
      component: 'BuyerGovernmentSupportStep',
      conditionField: false,
      nextForm: 'wv-pb-step-9',
      required: ['wv_reasonForApplying'],
    },

    'wv-pb-step-9': {
      component: 'BuyerBankingInfoStep',
      conditionField: false,
      nextForm: 'wv-pb-step-10',
      required: [],
    },

    'wv-pb-step-10': {
      component: 'BuyerPersonalInfoStep',
      conditionField: false,
      nextForm: 'wv-g-photo-company',
      required: [
        'wv_firstName',
        'wv_lastName',
        'wv_nationality',
        'wv_email',
        'wv_contactTelephone',
      ],
    },

    // VISITOR FLOW
    'wv-vs-step-1': {
      component: 'VisitorParticipationModelStep',
      conditionField: 'wv_participationModel',
      nextForm: [
        ['Public Visitor', 'wv-vs-step-2'],
        ['Company', 'wv-pb-step-1'],
      ],
      required: ['wv_participationModel'],
    },

    'wv-vs-step-2': {
      component: 'VisitorPointsOfInterestStep',
      conditionField: false,
      nextForm: 'wv-vs-step-3',
      required: ['wv_pointsOfInterest[]'],
    },

    'wv-vs-step-3': {
      component: 'VisitorPersonalInfoStep',
      conditionField: false,
      nextForm: 'wv-g-photo-profile',
      required: [
        'wv_company_city',
        'wv_company_country',
        'wv_email',
        'wv_firstName',
        'wv_lastName',
      ],
    },

    // GLOBAL SHARED STEPS
    'wv-g-photo-company': {
      component: 'CompanyPhotoStep',
      conditionField: false,
      nextForm: 'wv-g-photo-profile',
      required: ['wv_user-logo'],
    },

    'wv-g-photo-profile': {
      component: 'ProfilePhotoStep',
      conditionField: false,
      nextForm: 'wv-g-password',
      required: ['wv_user-avatar'],
    },

    'wv-g-password': {
      component: 'PasswordSetupStep',
      conditionField: false,
      nextForm: 'final',
      required: [
        'wv_user_password',
        'wv_password_confirm',
        'terms_conditions',
      ],
    },

    'final': {
      component: 'FinalReviewStep',
      conditionField: false,
      nextForm: 'submit',
      required: [
        'terms_conditions_final',
      ],
    },
  };
};

/**
 * Determines the next step key based on current step and user data
 * Mirrors the WordPress determine_next_step() method
 */
export const determineNextStep = (
  currentStep: string, 
  sessionData: RegistrationSession
): string | null => {
  const steps = getStepsConfig();
  if (!steps[currentStep]) {
    return null;
  }

  const cfg = steps[currentStep];
  let currentValue: any = null;

  if (cfg.conditionField) {
    const field = cfg.conditionField;
    const data = sessionData[`wv_reg_${currentStep}`] || {};
    currentValue = data[field] || null;
  }

  if (cfg.nextForm && Array.isArray(cfg.nextForm)) {
    let defaultNext: string | false = false;

    for (const [match, next] of cfg.nextForm) {
      // Previous step conditional logic
      if (match.startsWith('prev:')) {
        const parts = match.split(':');
        if (parts.length === 3) {
          const [, prevStep, expected] = parts;
          const prevCfg = steps[prevStep];
          if (prevCfg && prevCfg.conditionField) {
            const prevField = prevCfg.conditionField;
            const prevData = sessionData[`wv_reg_${prevStep}`] || {};
            const prevValue = prevData[prevField] || null;
            
            if (
              (Array.isArray(prevValue) && prevValue.includes(expected)) ||
              (!Array.isArray(prevValue) && prevValue === expected)
            ) {
              return next;
            }
          }
        }
      } 
      // Array includes logic
      else if (match.startsWith('includes:')) {
        const expected = match.substring(9);
        if (Array.isArray(currentValue) && currentValue.includes(expected)) {
          return next;
        } else if (!Array.isArray(currentValue) && expected === currentValue) {
          return next;
        }
      } 
      // Default case
      else if (match === 'default') {
        defaultNext = next;
      }
      // Checkbox logic
      else if (match === 'on' && currentValue === 'on') {
        return next;
      } else if (match === 'off' && !currentValue) {
        return next;
      }
      // Direct value match
      else if (!Array.isArray(currentValue) && match === currentValue) {
        return next;
      }
    }

    return defaultNext || null;
  }

  if (typeof cfg.nextForm === 'string') {
    return cfg.nextForm;
  }

  return null;
};

/**
 * Validates step data before allowing navigation
 * Mirrors the WordPress validate_step_data() method
 */
export const validateStepData = (
  stepKey: string,
  data: Record<string, any>,
  allSessionData: RegistrationSession
): { isValid: boolean; errors: string[]; fields: string[] } => {
  const steps = getStepsConfig();
  let required = steps[stepKey]?.required || [];

  // Merge conditional requirements
  if (steps[stepKey]?.requiredIf) {
    // Pull all wizard data collected so far
    const globalData: Record<string, any> = {};
    Object.keys(allSessionData).forEach(key => {
      if (key.startsWith('wv_reg_') && typeof allSessionData[key] === 'object') {
        Object.assign(globalData, allSessionData[key]);
      }
    });

    steps[stepKey].requiredIf?.forEach(rule => {
      const field = rule.when.field;
      const needles = rule.when.in;
      const val = globalData[field];
      
      const match = Array.isArray(val)
        ? val.some(v => needles.includes(v))
        : needles.includes(val);

      if (match) {
        required = [...required, ...rule.fields];
      }
    });
  }

  const badFields: string[] = [];
  const msgLines: string[] = [];

  const isEmail = (s: string) => s.toLowerCase().includes('email');
  const isNumber = (s: string) => /_number$|qty|quantity/i.test(s);
  const isPassword = (s: string) => s === 'wv_user_password';
  const isPasswordConfirm = (s: string) => s === 'wv_password_confirm';

  required.forEach(slug => {
    const base = slug.endsWith('[]') ? slug.slice(0, -2) : slug;
    const val = data[base];
    const empty = Array.isArray(val) ? val.length === 0 : (val === '' || val === null || val === undefined);

    // Password validation
    if (isPassword(base)) {
      if (empty) {
        msgLines.push('Password is required.');
        badFields.push(base);
      } else {
        if (val.length < 10) {
          msgLines.push('Password must be at least 10 characters.');
          badFields.push(base);
        }
        if (!/[A-Z]/.test(val)) {
          msgLines.push('Password must include an uppercase letter.');
          badFields.push(base);
        }
        if (!/\d/.test(val)) {
          msgLines.push('Password must include a number.');
          badFields.push(base);
        }
      }
      return;
    }

    // Password confirmation
    if (isPasswordConfirm(base)) {
      if (empty) {
        msgLines.push('Please confirm your password.');
        badFields.push(base);
      } else if (val !== (data['wv_user_password'] || '')) {
        msgLines.push('Passwords do not match.');
        badFields.push(base);
      }
      return;
    }

    // Email validation
    if (!empty && isEmail(base) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      msgLines.push('Please enter a valid email address.');
      badFields.push(base);
      return;
    }

    // Number validation
    if (!empty && isNumber(base) && isNaN(Number(val))) {
      msgLines.push('This field must be a number.');
      badFields.push(base);
      return;
    }

    // Generic required field check
    if (empty) {
      const label = base.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      msgLines.push(`${label} is required.`);
      badFields.push(base);
    }
  });

  return {
    isValid: badFields.length === 0,
    errors: msgLines,
    fields: badFields
  };
};

/**
 * Handles co-exhibitor invitation logic
 * Mirrors WordPress prefill_coex_session() method
 */
export const prefillCoexhibitorSession = (
  invite: any,
  sessionData: RegistrationSession
): RegistrationSession => {
  const exhibitorId = invite.exhibitor_id;
  const fieldOfWork = invite.field_of_work || '';

  return {
    ...sessionData,
    wv_reg_path: ['1', 'wv-ex-step-1', 'wv-ex-step-2'],
    'wv_reg_1': { wv_profileSelection: 'Exhibitor' },
    'wv_reg_wv-ex-step-1': { wv_fieldOfWork: fieldOfWork },
    'wv_reg_wv-ex-step-2': { wv_participationModel: 'Co-Exhibitor' },
    'wv_reg_wv-ex-step-10': { wv_email: invite.coemail },
    coex_email: invite.coemail,
    coex_token: invite.token,
    coex_exhibitor_id: exhibitorId,
  };
};

/**
 * Checks if user can navigate to previous step
 */
export const canNavigatePrevious = (
  currentStep: string,
  sessionData: RegistrationSession
): boolean => {
  const fromInvite = !!sessionData.coex_token;
  
  if (fromInvite && currentStep === 'wv-ex-step-3') {
    return false;
  }
  
  return currentStep !== '1';
};

/**
 * Gets the step navigation path for UI display
 */
export const getStepNavigationPath = (
  userType: 'exhibitor' | 'buyer' | 'visitor'
): Array<{ stepKey: string; stepName: string; isRequired: boolean }> => {
  const registrationSteps = REGISTRATION_STEPS[userType] || [];
  const stepsConfig = getStepsConfig();
  
  return registrationSteps.map(step => ({
    stepKey: `wv-${userType.substring(0, 2)}-step-${step.stepNumber}`,
    stepName: step.stepName,
    isRequired: step.isRequired
  }));
};

/**
 * Clears registration session data
 */
export const clearRegistrationSession = (
  sessionData: RegistrationSession
): RegistrationSession => {
  const clearedData: RegistrationSession = {};
  
  // Keep non-registration data
  Object.keys(sessionData).forEach(key => {
    if (!key.startsWith('wv_reg_') && key !== 'wv_reg_path') {
      clearedData[key] = sessionData[key];
    }
  });
  
  return clearedData;
};
