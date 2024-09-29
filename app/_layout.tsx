import React, { useContext, useEffect } from 'react';
import { ThemeProvider as NavigationThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider, ThemeContext } from '@/styles/themeContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from '@/styles/theme';
import '../global.css';
import AppStack from './AppStack';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { currentTheme, appTheme } = useContext(ThemeContext);

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

  const navTheme = currentTheme === 'dark'
    ? DarkTheme
    : currentTheme === 'light'
      ? DefaultTheme
      : appTheme === theme.dark
        ? DarkTheme
        : DefaultTheme;

  return (
    <ThemeProvider>
      <NavigationThemeProvider value={navTheme}>
        <AppStack />
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}
