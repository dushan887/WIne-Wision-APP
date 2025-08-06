import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { LoadingSpinner } from './components/common';
import { AppNavigator } from './navigation/AppNavigator';
import { store } from './store';
import { checkAuthStatus } from './store/actions';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Inter Tight Variable Fonts (Wine Vision brand fonts)
    'InterTight-VariableFont_wght': require('../assets/fonts/inter-tight/InterTight-VariableFont_wght.ttf'),
    'InterTight-Italic-VariableFont_wght': require('../assets/fonts/inter-tight/InterTight-Italic-VariableFont_wght.ttf'),
    
    // Wine Vision Icon Font
    'Wine-Vision': require('../assets/fonts/wv-icons/Wine-Vision.ttf'),
    
    // Fallback Inter fonts
    'Inter_400Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter_600SemiBold': require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    'Inter_700Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  useEffect(() => {
    // Check authentication status on app start
    store.dispatch(checkAuthStatus());
  }, []);

  if (!fontsLoaded) {
    return <LoadingSpinner text="Loading Wine Vision fonts..." />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="rgb(11,5,28)" />
      <AppNavigator />
    </Provider>
  );
}
