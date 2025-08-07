import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const FAQScreen = () => {
  const faqs = [
    {
      question: "When is Wine Vision 2025?",
      answer: "Wine Vision 2025 will take place November 22-25, 2025 at Belgrade Fair, Serbia."
    },
    {
      question: "How do I register as an exhibitor?",
      answer: "You can register as an exhibitor through our app by selecting the 'Exhibit' option on the landing page and completing the application form."
    },
    {
      question: "What types of visitors can attend?",
      answer: "Wine Vision welcomes trade professionals, industry buyers, distributors, retailers, sommeliers, and wine enthusiasts. Different registration categories are available."
    },
    {
      question: "Is there a mobile app for the event?",
      answer: "Yes! This Wine Vision app provides access to exhibitor listings, meeting scheduling, event programs, and networking features."
    },
    {
      question: "What products can be exhibited?",
      answer: "Wine Vision showcases wines, spirits, beer, equipment, packaging, services, and related industry products and technologies."
    },
    {
      question: "How do I schedule meetings with exhibitors?",
      answer: "Use the 'Meeting Requests' feature in the app to connect with exhibitors and schedule appointments during the fair."
    }
  ];

  return (
    <ScrollView style={tw`flex-1 bg-[#0b051c]`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-white text-2xl font-bold mb-6`}>Frequently Asked Questions</Text>
        
        {faqs.map((faq, index) => (
          <View key={index} style={tw`mb-4 p-4 bg-gray-800 rounded-lg`}>
            <View style={tw`flex-row items-start mb-2`}>
              <Ionicons name="help-circle-outline" size={20} color="#6e0fd7" style={tw`mr-2 mt-1`} />
              <Text style={tw`text-white text-lg font-semibold flex-1`}>
                {faq.question}
              </Text>
            </View>
            <Text style={tw`text-gray-300 text-base leading-6 ml-7`}>
              {faq.answer}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FAQScreen;
