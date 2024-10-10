import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Loader } from '@/components/LoaderComponent';
import Subject from '@/components/QBank/Subjects';
import { Subject as SubjectType, ApiResponse } from '@/components/QBank/types';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';

const SubjectsPage: React.FC = () => {
  const { appTheme } = useTheme();
  const { data, isLoading, error } = useApi<ApiResponse<SubjectType[]>>(`${process.env.EXPO_PUBLIC_API_URL}/subject/`);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.errorBackground }}>
        <Text style={{ color: appTheme.colors.errorText }}>
          Error: {error.message} (Status: {error.status})
        </Text>
      </View>
    );
  }

  if (!data || data?.data?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
        <Text style={{ color: appTheme.colors.primary }}>No subjects found.</Text>
      </View>
    );
  }

  const handleSelectSubject = (subject: SubjectType) => {
    router.push({
      pathname: `/subject/[id]`,
      params: { id: subject.id.toString(), name: subject.name, chapters: JSON.stringify(subject.chapters || []) },
    });
  };

  return (
    <SearchableList
      items={data.data}
      searchKey="name"
      renderItem={(subject) => (
        <Subject key={subject.id} subject={subject} onSelect={handleSelectSubject} />
      )}
      noItemsText="No subjects found matching your search."
    />
  );
};

export default SubjectsPage;
