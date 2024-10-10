import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Divider } from 'react-native-elements';
import QuestionPage from '@/components/QBank/Question';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
  const router = useRouter();
  const { appTheme } = useTheme()

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: appTheme.colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className='items-center justify-center'>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          style={{ width: '40%', height: '40%' }}
        />
        <Text>By the doctor, For the doctor</Text>
      </View>
      <Divider />
      <QuestionPage />
    </ScrollView>
  );
}
