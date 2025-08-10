# Form Field Utilities System

## Overview

The Wine-Vision app now has a comprehensive form field utilities system that provides reusable components and validation logic for both registration and profile editing features.

## Core Components

### 1. Form Field Types (`src/utils/formFields.ts`)

**Purpose**: Defines the foundation types and interfaces for all form fields.

**Key Features**:
- `FieldType` enum: text, email, phone, password, select, radio, checkbox, textarea
- `FormFieldDefinition` interface: Complete field configuration
- `ValidationRule` interface: Validation patterns and custom rules
- Common validators: email, phone, password patterns

### 2. Registration Field Definitions (`src/utils/registrationFields.ts`)

**Purpose**: Contains all field definitions organized by categories and profiles.

**Field Collections**:
- `COMMON_FIELDS`: firstName, lastName, email, phone (used by all profiles)
- `COMPANY_FIELDS`: companyName, website, businessCategory, etc.
- `PERSONAL_FIELDS`: age, gender, maritalStatus, occupation, etc.
- `EXHIBITOR_SPECIFIC_FIELDS`: companyType, foundingYear, productionRange, etc.
- `BUYER_SPECIFIC_FIELDS`: purchaseVolume, purchaseFrequency, priceRange, etc.
- `VISITOR_SPECIFIC_FIELDS`: visitPurpose, interests, etc.
- `SOCIAL_FIELDS`: LinkedIn, Facebook, Instagram, Twitter
- `FINANCIAL_FIELDS`: annualTurnover, employees, markets
- `COMMUNICATION_FIELDS`: newsletter, promotions, notifications

### 3. Profile Field Management (`src/utils/profileFields.ts`)

**Purpose**: Provides utilities for field validation, visibility, and management.

**Key Functions**:
- `getFieldsForProfile(profile)`: Get all fields for Exhibitor/Buyer/Visitor
- `validateAllFields(fields, data)`: Validate data against field definitions  
- `getVisibleFields(fields, data)`: Apply conditional visibility logic
- `canProceedWithStep(fields, data, stepFields)`: Check if step can proceed
- `getMissingRequiredFields(fields, data)`: Find missing required fields
- `validateField(field, value, allData)`: Validate single field

### 4. Reusable Form Components (`src/components/common/FormField.tsx`)

**Purpose**: Provides consistent UI components for all form field types.

**Features**:
- Automatic input type selection based on field type
- Built-in validation and error display
- Conditional rendering based on field visibility
- Consistent styling with Wine Vision theming
- Support for select dropdowns, radio groups, checkboxes

## Profile-Specific Field Counts

### Exhibitor Profile (40+ fields)
- Basic info: firstName, lastName, email, phone
- Company details: companyName, website, businessCategory, companyType
- Production info: foundingYear, productionRange, wineTypes, certifications
- Financial: annualTurnover, employees, exportMarkets
- Social media: LinkedIn, Facebook, Instagram, Twitter
- Personal: age, gender, maritalStatus, occupation, education
- Communication preferences: newsletter, promotions, notifications

### Buyer Profile (30+ fields)  
- Basic info: firstName, lastName, email, phone
- Company details: companyName, website, businessCategory
- Buying info: purchaseVolume, purchaseFrequency, priceRange, buyingCriteria
- Social media: LinkedIn, Facebook, Instagram, Twitter
- Personal: age, gender, maritalStatus, occupation, education
- Communication preferences: newsletter, promotions, notifications

### Visitor Profile (15+ fields)
- Basic info: firstName, lastName, email, phone
- Visit details: visitPurpose, interests, previousVisits
- Personal: age, gender, maritalStatus, occupation

## Usage Examples

### Registration Implementation
```typescript
import { getFieldsForProfile, validateAllFields } from '../utils/profileFields';

const registrationFields = getFieldsForProfile('Exhibitor');
const errors = validateAllFields(registrationFields, formData);
```

### Profile Editing (Future Implementation)
```typescript
import { getFieldsForProfile } from '../utils/profileFields';

const editableFields = getFieldsForProfile('Exhibitor')
  .filter(field => field.key !== 'email'); // email not editable
```

### Step Validation
```typescript
import { canProceedWithStep } from '../utils/profileFields';

const canProceed = canProceedWithStep(
  fields, 
  formData, 
  ['firstName', 'lastName', 'email']
);
```

## Benefits

### Code Reusability
- Same field definitions used for registration and profile editing
- Centralized validation logic
- Consistent UI components across the app

### Maintainability  
- Single source of truth for field definitions
- Easy to add new fields or modify existing ones
- Type-safe with full TypeScript support

### Scalability
- Easy to add new profile types
- Extensible validation system
- Flexible conditional field logic

### Performance
- React.memo and useCallback optimizations
- Efficient field filtering and validation
- Minimal re-renders with proper dependencies

## Integration Status

### Completed
✅ Core field type definitions and validation patterns
✅ Comprehensive field collections for all profile types  
✅ Field management utilities with validation
✅ Reusable FormField component
✅ Registration step integration ready
✅ Example usage patterns documented

### Next Steps
🔄 Integrate utilities into existing registration steps
🔄 Implement profile editing screens using same utilities
🔄 Add field dependency management for complex conditional logic
🔄 Expand validation patterns for business-specific rules

## File Structure
```
src/utils/
├── formFields.ts          # Core types and validation patterns
├── registrationFields.ts  # Field definitions by category
├── profileFields.ts       # Field management utilities  
└── formFieldExamples.ts   # Usage examples and patterns

src/components/common/
└── FormField.tsx          # Reusable form components
```

This system provides a solid foundation for consistent, maintainable form handling throughout the Wine-Vision application.
