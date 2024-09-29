
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const router = useRouter();
  const { appTheme } = useTheme()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.colors.background }}>
      <Text style={{ color: appTheme.colors.text, fontSize: appTheme.fontSizes.large, fontFamily: appTheme.fontFamily }}>Home Page</Text>
    </View>
  );
}
