import React from 'react';
import { View, Text } from 'react-native';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import { useLocalSearchParams } from 'expo-router';
import { Topic } from '@/types/pyqtypes';
import { Loader } from '@/components/LoaderComponent';

export default function TopicsScreen() {
  const { appTheme } = useTheme();
  const { subjectId, yearId } = useLocalSearchParams();

  const apiUrl =
    subjectId && yearId
      ? `${process.env.EXPO_PUBLIC_API_URL}/subject/${subjectId}/year/${yearId}/topics/`
      : null;

  const { data, isLoading, error } = useApi<ApiResponse<{ data: Topic[] }>>(apiUrl || '');

  if (!subjectId || !yearId) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.secondaryBackground }}>
        <Text style={{ color: appTheme.colors.text }}>Invalid subject or year selection.</Text>
      </View>
    );
  }

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.errorBackground }}>
        <Text style={{ color: appTheme.colors.errorText }}>Error: {error.message}</Text>
      </View>
    );
  }

  const topics = Array.isArray(data?.data) ? data.data : [];

  if (topics.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
        <Text style={{ color: appTheme.colors.primary }}>No topics found.</Text>
      </View>
    );
  }

  return (
    <SearchableList
      items={topics}
      searchKey="name"
      renderItem={(topic: Topic) => (
        <View
          key={topic.id}
          className="rounded-lg p-4 mb-4"
          style={{ backgroundColor: appTheme.colors.secondaryBackground }}
        >
          <Text
            className="text-lg font-semibold"
            style={{ color: appTheme.colors.text }}
          >
            {topic.name}
          </Text>
          {topic.description && (
            <Text
              className="text-sm"
              style={{ color: appTheme.colors.textSecondary, marginTop: appTheme.spacing.small }}
            >
              {topic.description}
            </Text>
          )}
        </View>
      )}
      noItemsText="No topics found."
    />
  );
}
