import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';

export default function AppStack() {
  const { appTheme } = useTheme();

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
      {/* ----------------------Main Drawer Screen--------------------------- */}
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false }}
      />

      {/* ----------------------Settings Screen--------------------------- */}
      <Stack.Screen
        name="home/settings"
        options={{ title: 'Settings Page' }}
      />

      {/* ----------------------QBank Screen with Dynamic Title--------------------------- */}
      <Stack.Screen
        name="subject/[id]"
        options={({ route }) => {
          const { name } = route.params || {} as any;
          return {
            title: name ? `${name}` : 'All Chapters',
          };
        }}
      />

      {/* ----------------------PYQ Flow Screens--------------------------- */}
      <Stack.Screen
        name="pyq/exam"
        options={{ title: 'Exams' }}
      />
      <Stack.Screen
        name="pyq/subject"
        options={{ title: 'Subjects' }}
      />
      <Stack.Screen
        name="pyq/year"
        options={{ title: 'Years' }}
      />
      <Stack.Screen
        name="pyq/topic"
        options={{ title: 'Topics' }}
      />
      <Stack.Screen
        name="pyq/study-material"
        options={{ title: 'StudyMaterial' }}
      />

      {/* ----------------------404 Not Found Screen--------------------------- */}
      <Stack.Screen
        name="+not-found"
        options={{ title: 'Page Not Found' }}
      />
    </Stack>
  );
}
