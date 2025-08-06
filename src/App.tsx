import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { LoadingSpinner } from './components/common';
import { AppNavigator } from './navigation/AppNavigator';
import { store } from './store';
import { checkAuthStatus } from './store/actions';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    // Check authentication status on app start
    store.dispatch(checkAuthStatus());
  }, []);

  if (!fontsLoaded) {
    return <LoadingSpinner text="Loading fonts..." />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#7c2d12" />
      <AppNavigator />
    </Provider>
  );
}
