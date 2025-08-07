import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

// Screens
import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Auth/Login';
import { RegisterScreen } from '../screens/Auth';
import { ProfileScreen, EditProfileScreen } from '../screens/Profile';
import { NewsScreen } from '../screens/News';
import { NotificationsScreen } from '../screens/Notifications';
import { ComingSoonScreen } from '../screens/Errors';
import AboutScreen from '../screens/Static/AboutScreen';
import ContactScreen from '../screens/Static/ContactScreen';
import FAQScreen from '../screens/Static/FAQScreen';
import PrivacyScreen from '../screens/Static/PrivacyScreen';
import TermsScreen from '../screens/Static/TermsScreen';
import SupportScreen from '../screens/Static/SupportScreen';

// Custom Header (new, for conditional rendering)
import CustomHeader from '../components/common/CustomHeader';

// Types
export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  EditProfile: undefined;
  News: undefined;
  Notifications: undefined;
  ComingSoon: undefined;
  About: undefined;
  Contact: undefined;
  FAQ: undefined;
  Privacy: undefined;
  Terms: undefined;
  Support: undefined;
  // Add main nav items
  '2025 List of Buyers': undefined;
  'Meeting Requests': undefined;
  Calendar: undefined;
  Events: undefined;
  Products: undefined;
  Services: undefined;
  '2025 Program': undefined;
  'Latest News': undefined;
  'Open Podcast': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} isAuthenticated={isAuthenticated} />,
          cardStyle: { backgroundColor: 'rgb(11,5,28)' }, // Dark background
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="FAQ" component={FAQScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="News" component={NewsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="2025 List of Buyers" component={ComingSoonScreen} />
            <Stack.Screen name="Meeting Requests" component={ComingSoonScreen} />
            <Stack.Screen name="Calendar" component={ComingSoonScreen} />
            <Stack.Screen name="Events" component={ComingSoonScreen} />
            <Stack.Screen name="Products" component={ComingSoonScreen} />
            <Stack.Screen name="Services" component={ComingSoonScreen} />
            <Stack.Screen name="2025 Program" component={ComingSoonScreen} />
            <Stack.Screen name="Latest News" component={ComingSoonScreen} />
            <Stack.Screen name="Open Podcast" component={ComingSoonScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="FAQ" component={FAQScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
