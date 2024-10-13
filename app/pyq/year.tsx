import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { Loader } from '@/components/LoaderComponent';
import { Year as YearType } from '@/types/pyqtypes';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import { router, useLocalSearchParams } from 'expo-router';

const YearsScreen: React.FC = () => {
  const { appTheme } = useTheme();
  const { subjectId } = useLocalSearchParams();
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
    router.push({
      pathname: '/pyq/topic',
      params: { subjectId, yearId },
    });
  };

  return (
    <SearchableList
      items={data.data}
      searchKey="year"
      renderItem={(year: YearType) => (
        <TouchableOpacity onPress={() => handleYearSelect(year.id)}>
          <View
            className="rounded-lg p-4 mb-4"
            style={{ backgroundColor: appTheme.colors.secondaryBackground }}
          >
            <Text
              className="text-lg font-semibold"
              style={{ color: appTheme.colors.text }}
            >
              {year.year}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      noItemsText="No years found matching your search."
    />
  );
};

export default YearsScreen;
