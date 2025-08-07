import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import tw from 'twrnc';

const App = () => {
  const [fontsLoaded] = useFonts({
    'InterTight-VariableFont_wght': require('../assets/fonts/inter-tight/InterTight-VariableFont_wght.ttf'),
    'InterTight-Italic-VariableFont_wght': require('../assets/fonts/inter-tight/InterTight-Italic-VariableFont_wght.ttf'),
    'Wine-Vision': require('../assets/fonts/wv-icons/Wine-Vision.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={tw`flex-1 justify-center items-center bg-[#0b051c]`}><Text style={tw`text-white`}>Loading fonts...</Text></View>;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
