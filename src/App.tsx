import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import { theme } from './theme';
import { ErrorMessage } from './components/common/ErrorMessage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'InterTight-VariableFont_wght': require('../assets/fonts/inter-tight/InterTight-VariableFont_wght.ttf'),
    'InterTight-Italic-VariableFont_wght': require('../assets/fonts/inter-tight/InterTight-Italic-VariableFont_wght.ttf'),
    'Wine-Vision': require('../assets/fonts/wv-icons/Wine-Vision.ttf'),
  });

  // Handle font loading states
  if (!fontsLoaded && !fontError) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, theme.styles.bg.carbon]}>
        <Text style={[tw`text-lg`, theme.styles.text.white]}>Loading fonts...</Text>
      </View>
    );
  }

  if (fontError) {
    return <ErrorMessage message="Font loading failed" />;
  }

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
        // You can add error reporting here (Sentry, Crashlytics, etc.)
      }}
      resetOnPropsChange
    >
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
