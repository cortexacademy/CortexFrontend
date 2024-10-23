import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams } from 'expo-router';
import { ApiResponse, useApi } from '@/hooks/useApi';
import { StudyMaterialType } from '@/types/pyqtypes';
import Markdown from 'react-native-markdown-display';
import { Loader } from '@/components/common/LoaderComponent';

export default function StudyMaterialScreen() {
  const { appTheme } = useTheme();
  const { subjectId, examId, yearId } = useLocalSearchParams();
  const token = process.env.EXPO_PUBLIC_API_TOKEN;
  const { data, isLoading, error } = useApi<ApiResponse<{ data: StudyMaterialType[] }>>(
    `${process.env.EXPO_PUBLIC_API_URL}/study-material`,
    token,
    {
      params: {
        year__id: yearId,
        subject__id: subjectId,
        exam__id: examId,
      },
    }
  );

  const studyMaterials = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={studyMaterials}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        // <View style={{ padding: 16, backgroundColor: appTheme.colors.primary, marginBottom: 8 }}>
        <Markdown>{item.statement}</Markdown>
        // </View>
      )}
      style={{ padding: 16, }}
      ListEmptyComponent={<Text style={{ color: appTheme.colors.white }}>No study materials found.</Text>}
    />
  );
};