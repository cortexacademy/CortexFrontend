import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';


export default function AppStack() {
  const { appTheme } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: appTheme.colors.headerBackground,
        },
        headerTintColor: appTheme.colors.white,
        headerShown: true,
      }}
    >
      {/* ----------------------All Drawer screens--------------------------- */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="home/settings" options={{ title: 'Settings Page' }} />

      {/* ----------------------All QBank screens--------------------------- */}
      <Stack.Screen
        name="subject/[id]"
        options={({ route }) => {
          const { name } = route.params || {} as any;
          return {
            title: name ? `${name}` : 'All Chapters',
          };
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
