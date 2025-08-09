import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import tw from 'twrnc';
import { StepHeader } from '../common';
import { getProfileTheme } from '../../utils/profileTheming';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepTermsProps {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

const StepTerms: React.FC<StepTermsProps> = ({ 
  savedData, 
  onUpdateData, 
  onNext, 
  headerTitle, 
  headerSubtitle 
}) => {
  const [termsAccepted, setTermsAccepted] = useState(savedData?.terms_conditions_final || false);

  // Get the current profile theme - memoized to prevent unnecessary recalculations
  const profileTheme = useMemo(() => {
    return getProfileTheme(savedData?.wv_profileSelection || null);
  }, [savedData?.wv_profileSelection]);

  const profile = savedData?.wv_profileSelection || '';
  const participationModel = savedData?.wv_participationModel || '';

  const handleTermsChange = useCallback((value: boolean) => {
    setTermsAccepted(value);
    onUpdateData?.({ terms_conditions_final: value });
  }, [onUpdateData]);

  const openLink = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  // Get the appropriate header title based on profile
  const getHeaderTitle = () => {
    if (profile === 'Exhibitor') {
      return 'RULES UPON PARTICIPATION AT WINE VISION FAIR & THE CONTRACT SPECIAL CONDITIONS';
    }
    return '2025 RULES OF PARTICIPATION';
  };

  // Render content based on profile
  const renderContent = () => {
    if (profile === 'Exhibitor') {
      return (
        <View>
          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            EXHIBITORS
          </Text>
          <Text style={[tw`text-sm mb-6 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            Companies or individuals renting exhibition space for their product range display are entitled to the registration in the official Fair Catalogue, inscription on fascia panel and the right to use all other Belgrade Fair services. The exhibitor agrees to respect the opening and closing times of the fair event, and in particular that the stand with exhibits will be in operation until the event closes.
          </Text>

          <View style={[tw`h-px mb-6`, { backgroundColor: colors.w, opacity: 0.3 }]} />

          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            CO-EXHIBITORS
          </Text>
          <Text style={[tw`text-sm mb-6 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            If the stand area rented by the Exhibitor is used by another company represented by its own exhibits and staff, such company shall apply as Co-Exhibitor and shall submit a separate Application form and pay the Registration fee for compulsory Catalogue listing. Co-Exhibitors shall have their inscription on the fascia panel alongside Exhibitor's inscription.
          </Text>

          <View style={[tw`h-px mb-6`, { backgroundColor: colors.w, opacity: 0.3 }]} />

          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            CONTRACTING
          </Text>
          <Text style={[tw`text-sm mb-4 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            The Exhibitor may withdraw the submitted Application for Participation not later than 15 (fifteen) days upon the Application registration in Belgrade Fair Archive Office. If Belgrade Fair does not inform the applicant about its decision, it will be considered that the application for participation has been accepted.
          </Text>

          <Text style={[tw`text-sm mb-4 leading-6 font-medium`, { color: colors.w, opacity: 0.75 }]}>
            The price of the compulsory registration fee includes the following services for each company separately:
          </Text>

          <View style={tw`mb-6`}>
            {[
              'Publishing of the exhibitor\'s data in the official catalog',
              'Publishing up to 20 words of text describing product range',
              'Publishing of Exhibitor\'s registered trade mark',
              'A Complimentary copy of the Register',
              'Complimentary exhibitor passes - 3 pcs.',
              'One exhibitor pass for each co-exhibitor',
              'Free pedestrian passes based on rented space',
              'Parking passes based on rented exhibition space'
            ].map((item, index) => (
              <View key={index} style={tw`flex-row mb-2`}>
                <Text style={[tw`text-sm mr-2`, { color: colors.w, opacity: 0.75 }]}>•</Text>
                <Text style={[tw`text-sm flex-1 leading-5`, { color: colors.w, opacity: 0.75 }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View style={[tw`h-px mb-6`, { backgroundColor: colors.w, opacity: 0.3 }]} />

          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            EXHIBIT INSURANCE
          </Text>
          <Text style={[tw`text-sm mb-4 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            Exhibits and any other Exhibitor's property shall be insured against theft, damage, etc. at all fair events taking place at Belgrade Fair. The insurance covers the time period from unloading to loading into transportation vehicle.
          </Text>

          <Text style={[tw`text-sm mb-6 leading-6 font-medium`, { color: colors.w, opacity: 0.75 }]}>
            Application form has the legal force of a Contract. In case of any disputes, the Contract Parties have agreed to settle such disputes by the Foreign Trade Arbitration with the Serbian Chamber of Commerce in Belgrade.
          </Text>
        </View>
      );
    } else if (profile === 'Buyer' || participationModel === 'Company') {
      return (
        <View>
          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            Personal Information
          </Text>
          <Text style={[tw`text-sm mb-6 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            By submitting your personal information, you have consented to the collection, storage, and use of this data. Your information will be used solely for the purposes of communication, registration, and providing relevant updates. We are committed to protecting your privacy and will not share your data with third parties without your explicit consent, except as required by law. For more details, please review our{' '}
            <Text 
              style={[tw`font-semibold`, { color: colors.w }]}
              onPress={() => openLink('https://example.com/privacy-policy')}
            >
              Privacy Policy
            </Text>.
          </Text>

          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            Consent and Evaluation
          </Text>
          <Text style={[tw`text-sm mb-6 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            By creating an account, you have consented to participate in the 2025 Business Meetings Program. Wine Vision by Open Balkan Fair reserves all rights to evaluate, approve, or decline any submitted participant account, including application for the Wine Vision Hosted Buyers Program, based on its assessment. If a participant does not pass the evaluation, Wine Vision by Open Balkan Fair is legally obligated to remove all data provided by the participant during registration and will not retain or utilize it in the future.
          </Text>
        </View>
      );
    } else if (participationModel === 'Public Visitor') {
      return (
        <View>
          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            Personal Information
          </Text>
          <Text style={[tw`text-sm mb-6 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            By submitting your personal information, you have consented to the collection, storage, and use of this data. Your information will be used solely for the purposes of communication, registration, and providing relevant updates. We are committed to protecting your privacy and will not share your data with third parties without your explicit consent, except as required by law. For more details, please review our{' '}
            <Text 
              style={[tw`font-semibold`, { color: colors.w }]}
              onPress={() => openLink('https://example.com/privacy-policy')}
            >
              Privacy Policy
            </Text>.
          </Text>

          <Text style={[tw`text-lg font-semibold mb-4`, { color: colors.w }]}>
            Evaluation
          </Text>
          <Text style={[tw`text-sm mb-6 leading-6`, { color: colors.w, opacity: 0.75 }]}>
            Wine Vision by Open Balkan Fair reserves all rights to evaluate, approve, or decline any submitted account, based on its assessment. If an applicant does not pass the evaluation, Wine Vision by Open Balkan Fair is legally obligated to remove all data provided by the applicant during registration and will not retain or utilize it in the future.
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={tw`flex-1`}>
      <View style={tw`px-6 pb-6`}>
        {/* Header */}
        <StepHeader 
          title={headerTitle || getHeaderTitle()} 
          subtitle={headerSubtitle || ''} 
        />
        
        {/* Content Container */}
        <View style={[
          tw`p-6 rounded-lg mt-6`,
          { backgroundColor: profileTheme.selectionColors.primary + '50' }
        ]}>
          {/* Terms Content */}
          {renderContent()}

          {/* Separator */}
          <View style={[tw`h-px my-8`, { backgroundColor: colors.w, opacity: 0.3 }]} />

          {/* Terms Acceptance */}
          <TouchableOpacity
            style={tw`flex-row items-start`}
            onPress={() => handleTermsChange(!termsAccepted)}
          >
            <View style={[
              tw`w-5 h-5 rounded border-2 mr-4 items-center justify-center mt-1`,
              { 
                borderColor: colors.w,
                backgroundColor: termsAccepted ? profileTheme.selectionColors.primary : 'transparent'
              }
            ]}>
              {termsAccepted && (
                <Text style={[
                  tw`text-xs font-bold`,
                  { color: colors.w }
                ]}>
                  ✓
                </Text>
              )}
            </View>
            
            <View style={tw`flex-1`}>
              {profile === 'Exhibitor' ? (
                <Text style={[tw`text-sm leading-6`, { color: colors.w }]}>
                  I declare hereby that I am aware of the participation conditions, mentioned in the{' '}
                  <Text 
                    style={[tw`font-semibold`, { color: colors.w }]}
                    onPress={() => openLink('https://sajam.rs/wp-content/uploads/pravilnik-2017-ENG.pdf')}
                  >
                    General Rules of Participation at Belgrade Fair Events
                  </Text>{' '}and the{' '}
                  <Text 
                    style={[tw`font-semibold`, { color: colors.w }]}
                    onPress={() => openLink('https://sajam.rs/wp-content/uploads/Rules_Upon_Participation_at_Wine_Vision_Fair_and_the_Contract_Special_Conditions.pdf')}
                  >
                    Rules Upon Participation at Wine Vision Fair and the Contract Special Conditions
                  </Text>{' '}and that I fully accept them.
                </Text>
              ) : (
                <Text style={[tw`text-sm leading-6`, { color: colors.w }]}>
                  I have read these terms and I fully accept them.
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default React.memo(StepTerms);
