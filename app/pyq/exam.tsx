import React from 'react';
import { View, Text } from 'react-native';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { Loader } from '@/components/LoaderComponent';
import { Exam as ExamType } from '@/types/pyqtypes';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import { Card } from '@/components/common/Card';
import { Image } from 'react-native-elements';
import { router } from 'expo-router';

const ExamsScreen: React.FC = () => {
  const { appTheme } = useTheme();
  const { data, isLoading, error } = useApi<ApiResponse<ExamType[]>>(`${process.env.EXPO_PUBLIC_API_URL}/exam/`);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.errorBackground }}>
        <Text style={{ color: appTheme.colors.errorText }}>Error: {error.message} (Status: {error.status})</Text>
      </View>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
        <Text style={{ color: appTheme.colors.primary }}>No exams found.</Text>
      </View>
    );
  }

  const handleExamSelect = (examId: number) => {
    router.push({
      pathname: '/pyq/subject',
      params: { examId },
    });
  };

  return (
    <SearchableList
      items={data.data}
      searchKey="name"
      renderItem={(exam: ExamType) => (
        <Card key={exam.id} onPress={() => handleExamSelect(exam.id)} containerStyle={{ height: 60 }}>
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
              {exam.name}
            </Text>
          </View>
        </Card>
      )}
      noItemsText="No exams found matching your search."
    />
  );
};

export default ExamsScreen;
