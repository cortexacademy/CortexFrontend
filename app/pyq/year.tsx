import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { Loader } from '@/components/common/LoaderComponent';
import { Year as YearType } from '@/types/pyqtypes';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/common/Card';

const YearsScreen: React.FC = () => {
  const { appTheme } = useTheme();
  const { subjectId, examId, type } = useLocalSearchParams();
  const { data, isLoading, error } = useApi<ApiResponse<YearType[]>>(
    `${process.env.EXPO_PUBLIC_API_URL}/subject/${subjectId}/years/`
  );

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
        <Text style={{ color: appTheme.colors.primary }}>No years found.</Text>
      </View>
    );
  }
  const handleYearSelect = (yearId: number) => {
    if (type === 'topics') {
      router.push({
        pathname: '/pyq/study-material',
        params: { yearId, subjectId, examId, type }
      });
    } else {
      router.push({
        pathname: '/pyq/questions',
        params: { yearId, subjectId, examId, type }
      });
    }
  };

  return (
    <SearchableList
      items={data.data}
      searchKey="year"
      renderItem={(year: YearType) => (
        <Card key={year.id} onPress={() => handleYearSelect(year.id)} containerStyle={{ padding: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: appTheme.colors.white, fontSize: appTheme.fontSizes.medium, fontWeight: 'bold' }}>
              {year.year}
            </Text>
          </View>
        </Card>
      )}
      noItemsText="No years found matching your search."
    />
  );
};

export default YearsScreen;
