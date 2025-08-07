// Example component demonstrating HTML message handling
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { useMessages } from '../../hooks';

const MessageDemoScreen = () => {
  const messages = useMessages();

  const demoMessages = {
    simpleSuccess: () => {
      messages.showSuccess('Profile updated successfully!');
    },

    htmlSuccess: () => {
      messages.showSuccessHTML(
        '<p>Welcome back, <strong>John Doe</strong>!</p><p>Last login: <em>2 hours ago</em></p>',
        '<strong>Login Successful</strong>'
      );
    },

    serverError: () => {
      // Simulating a WordPress-style server response
      const mockServerResponse = {
        message: '<strong>ERROR</strong>: The username field is required.'
      };
      messages.showServerResponse(mockServerResponse, 'error');
    },

    complexHtml: () => {
      messages.showInfoHTML(
        `<p>Your account has been updated with the following changes:</p>
         <ul>
           <li><strong>Email:</strong> Changed to new@example.com</li>
           <li><strong>Phone:</strong> Updated phone number</li>
           <li><strong>Notifications:</strong> Enabled email alerts</li>
         </ul>
         <p><em>Changes will take effect immediately.</em></p>`,
        'Account Updated'
      );
    },

    networkError: () => {
      messages.handleNetworkError();
    },

    unauthorizedAccess: () => {
      messages.handleUnauthorized();
    },

    sessionExpired: () => {
      messages.handleSessionExpired();
    },

    clearAllMessages: () => {
      messages.clearAll();
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-xl font-bold mb-4 text-center`}>
        Message System Demo
      </Text>
      
      <View style={tw`gap-3`}>
        <TouchableOpacity
          style={tw`bg-green-500 p-3 rounded`}
          onPress={demoMessages.simpleSuccess}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Simple Success Message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-green-600 p-3 rounded`}
          onPress={demoMessages.htmlSuccess}
        >
          <Text style={tw`text-white text-center font-bold`}>
            HTML Success Message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-red-500 p-3 rounded`}
          onPress={demoMessages.serverError}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Server Error (HTML)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded`}
          onPress={demoMessages.complexHtml}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Complex HTML Content
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-orange-500 p-3 rounded`}
          onPress={demoMessages.networkError}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Network Error
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-yellow-500 p-3 rounded`}
          onPress={demoMessages.unauthorizedAccess}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Unauthorized Access
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-purple-500 p-3 rounded`}
          onPress={demoMessages.sessionExpired}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Session Expired
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-500 p-3 rounded mt-4`}
          onPress={demoMessages.clearAllMessages}
        >
          <Text style={tw`text-white text-center font-bold`}>
            Clear All Messages
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={tw`text-sm text-gray-600 mt-6 text-center`}>
        Tap buttons above to see different message types.{'\n'}
        Messages will appear at the top of the screen.
      </Text>
    </View>
  );
};

export default MessageDemoScreen;
