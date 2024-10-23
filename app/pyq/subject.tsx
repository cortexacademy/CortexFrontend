import React from 'react';
import { View, Text } from 'react-native';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { Loader } from '@/components/common/LoaderComponent';
import { Subject as SubjectType } from '@/types/pyqtypes';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import { Card } from '@/components/common/Card';
import { Image } from 'react-native-elements';
import { useLocalSearchParams, router } from 'expo-router';

const SubjectsScreen: React.FC = () => {
  const { appTheme } = useTheme();
  const { examId, type } = useLocalSearchParams();
  const { data, isLoading, error } = useApi<ApiResponse<{ subjects: SubjectType[] }>>(
    `${process.env.EXPO_PUBLIC_API_URL}/exam/${examId}`
  );

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.errorBackground }}>
        <Text style={{ color: appTheme.colors.errorText }}>Error: {error.message} (Status: {error.status})</Text>
      </View>
    );
  }

  if (!data || data.data.subjects.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
        <Text style={{ color: appTheme.colors.primary }}>No subjects found.</Text>
      </View>
    );
  }

  const handleSubjectSelect = (subjectId: number) => {
    router.push({
      pathname: '/pyq/year',
      params: { subjectId, examId, type },
    });
  };

  return (
    <SearchableList
      items={data.data.subjects}
      searchKey="name"
      renderItem={(subject: SubjectType) => (
        <Card key={subject.id} onPress={() => handleSubjectSelect(subject.id)}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={{
              width: 50,
              height: 50,
              borderRadius: appTheme.borderRadius.small,
              marginRight: appTheme.spacing.medium,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: appTheme.colors.white, fontSize: appTheme.fontSizes.medium, fontWeight: 'bold' }}>
              {subject.name}
            </Text>
            <Text style={{ color: appTheme.colors.white, fontSize: appTheme.fontSizes.small, marginTop: appTheme.spacing.small }}>
              {subject.description || 'No description available'}
            </Text>
          </View>
        </Card>
      )}
      noItemsText="No subjects found matching your search."
    />
  );
};

export default SubjectsScreen;
