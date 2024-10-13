import React from 'react';
import { View, Text } from 'react-native';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import { router, useLocalSearchParams } from 'expo-router';
import { Topic } from '@/types/pyqtypes';
import { Loader } from '@/components/common/LoaderComponent';
import { Card } from '@/components/common/Card';

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
  const handleTopicSelect = (yearId: number) => {
    router.push({
      pathname: '/pyq/study-material',
      params: { materialId: yearId },
    });
  };

  return (
    <SearchableList
      items={topics}
      searchKey="name"
      renderItem={(topic: Topic) => (
        <Card key={topic.id} onPress={() => handleTopicSelect(topic.id)}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: appTheme.colors.white, fontSize: appTheme.fontSizes.medium, fontWeight: 'bold' }}>
              {topic.name}
            </Text>
            {topic.description && (
              <Text style={{ color: appTheme.colors.white, fontSize: appTheme.fontSizes.medium, fontWeight: 'bold' }}>
                {topic.description}
              </Text>
            )}
          </View>
        </Card>
      )}
      noItemsText="No topics found."
    />
  );
}
