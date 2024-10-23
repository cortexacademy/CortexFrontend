import React, { useEffect } from 'react';
import { ThemeProvider } from '@/styles/themeContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
import AppStack from './AppStack';
import { Provider } from 'react-redux';
import store from '@/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <AppStack />
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
