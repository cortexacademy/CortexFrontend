import React from 'react';
import { View, Text, Button, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
// import QuestionComponent from '@/components/QBank/Question';
import { useApi, ApiResponse } from '@/hooks/useApi';

export default function Home() {
  const router = useRouter();
  const { appTheme } = useTheme();

  // const { data: questionData, isLoading, error } = useApi<ApiResponse<subjectt>>(`${process.env.EXPO_PUBLIC_API_URL}/dailyquestion`);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color={appTheme.colors.primary} />
  //       <Text style={{ color: appTheme.colors.quaternary }}>Loading question...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text style={{ color: appTheme.colors.errorText }}>{error}</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView
      style={{ flexGrow: 1, backgroundColor: appTheme.colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ flexGrow: 1 }} className='items-center justify-center'>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          style={{ width: '40%', height: '40%' }}
        />
        <Text>By the doctor, For the doctor</Text>
      </View>
      <Divider />

      {/* {questionData ? (
        <QuestionComponent question={questionData} />
      ) : (
        <Text style={{ textAlign: 'center', color: appTheme.colors.quaternary }}>No question available.</Text>
      )} */}
    </ScrollView>
  );
}
