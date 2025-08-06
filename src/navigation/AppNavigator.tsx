import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';

// Import screens
import { LoginScreen } from '../screens/Auth';
import { RegisterScreen } from '../screens/Auth';
import { HomeScreen } from '../screens/Dashboard';
import { ProfileScreen, EditProfileScreen } from '../screens/Profile';
import { NewsScreen } from '../screens/News';
import { NotificationsScreen } from '../screens/Notifications';
import { ComingSoonScreen } from '../screens/Errors';
import { FontTest } from '../components/demo';

// Define navigation types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  News: undefined;
  Notifications: undefined;
  ComingSoon: undefined;
  FontTest: undefined;
};

export type RootStackParamList = AuthStackParamList & MainStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#7c2d12',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ title: 'Create Account' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7c2d12',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Wine Vision' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'My Profile' }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{ title: 'Edit Profile' }}
        />
        <Stack.Screen 
          name="News" 
          component={NewsScreen}
          options={{ title: 'News & Articles' }}
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen}
          options={{ title: 'Announcements' }}
        />
        <Stack.Screen 
          name="ComingSoon" 
          component={ComingSoonScreen}
          options={{ title: 'Coming Soon' }}
        />
        <Stack.Screen 
          name="FontTest" 
          component={FontTest}
          options={{ title: 'Font Test - Wine Vision' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
