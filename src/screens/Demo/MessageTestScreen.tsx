// Updated example showing the message system with proper positioning
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');
import { useMessages } from '../../hooks';
import CustomHeader from '../../components/common/CustomHeader';

const MessageTestScreen = () => {
  const messages = useMessages();

  const testMessages = [
    {
      title: 'Simple Success',
      action: () => messages.showSuccess('Profile updated successfully!'),
      color: 'bg-green-500'
    },
    {
      title: 'HTML Success',
      action: () => messages.showSuccessHTML(
        '<strong>Welcome back!</strong> Your last login was <em>2 hours ago</em>.',
        'Login Successful'
      ),
      color: 'bg-green-600'
    },
    {
      title: 'Server Error (HTML)',
      action: () => messages.showServerResponse({
        message: '<strong>ERROR:</strong> The username field is required.'
      }, 'error'),
      color: 'bg-red-500'
    },
    {
      title: 'Warning Message',
      action: () => messages.showWarning('Please verify your email address', 'Account Verification'),
      color: 'bg-yellow-500'
    },
    {
      title: 'Info with HTML',
      action: () => messages.showInfoHTML(
        'New features available: <strong>Dark Mode</strong> and <em>Advanced Search</em>',
        'App Update'
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Network Error',
      action: () => messages.handleNetworkError(),
      color: 'bg-orange-500'
    },
    {
      title: 'Clear All',
      action: () => messages.clearAll(),
      color: 'bg-gray-500'
    }
  ];

  return (
    <View style={tw`flex-1`}>
      {/* Header with integrated message area */}
      <CustomHeader isAuthenticated={true} />
      
      {/* Main content */}
      <ScrollView style={[tw`flex-1 p-4`, { backgroundColor: colors.c_10 }]}>
        <Text style={[tw`text-2xl font-bold text-center mb-6`, { color: colors.c_90 }]}>
          Message System Test
        </Text>
        
        <Text style={[tw`text-center mb-4 px-4`, { color: colors.c_70 }]}>
          Tap the buttons below to test different message types.{'\n'}
          Messages will appear below the header navigation.
        </Text>

        <View style={tw`gap-3 mb-8`}>
          {testMessages.map((test, index) => (
            <TouchableOpacity
              key={index}
              style={[tw`${test.color} p-4 rounded-lg shadow`]}
              onPress={test.action}
            >
              <Text style={tw`text-white text-center font-bold`}>
                {test.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Demo content to show scrolling behavior */}
        <View style={[tw`p-4 rounded-lg mb-4`, { backgroundColor: colors.c_20 }]}>
          <Text style={[tw`text-lg font-bold mb-2`, { color: colors.c_90 }]}>
            Demo Content
          </Text>
          <Text style={[tw`mb-2`, { color: colors.c_80 }]}>
            This content demonstrates how messages appear above the main content 
            while maintaining proper scrolling behavior.
          </Text>
          <Text style={{ color: colors.c_70 }}>
            The message area is positioned below the navigation header and will 
            push content down when messages are displayed.
          </Text>
        </View>

        {/* Additional content for scrolling demo */}
        {[1, 2, 3, 4, 5].map(num => (
          <View key={num} style={[tw`p-4 rounded-lg mb-4`, { backgroundColor: colors.c_20 }]}>
            <Text style={[tw`font-bold`, { color: colors.c_90 }]}>
              Content Block {num}
            </Text>
            <Text style={{ color: colors.c_70 }}>
              This is example content to demonstrate scrolling behavior 
              when messages are displayed.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MessageTestScreen;
