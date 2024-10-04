import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Loader } from '@/components/LoaderComponent';
import Subject from '@/components/QBank/Subjects';
import { Subject as SubjectType, ApiResponse } from '@/components/QBank/types';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

const SubjectsPage: React.FC = () => {
  const { appTheme } = useTheme();
  const { data, isLoading, error } = useApi<ApiResponse<SubjectType[]>>(`${process.env.EXPO_PUBLIC_API_URL}/subject/`);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.background }}>
        <Text style={{ color: appTheme.colors.textSecondary }}>No subjects found.</Text>
      </View>
    );
  }

  const handleSelectSubject = (subject: SubjectType) => {
    router.push({
      pathname: `/subject/[id]`,
      params: { id: subject.id.toString(), name: subject.name, chapters: JSON.stringify(subject.chapters || []) },
    });
  };

  const handleSearchInputChange = (text?: string) => setSearchQuery(text || '');

  const filteredSubjects = data.data.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1" style={{ backgroundColor: appTheme.colors.quaternary, height: "100%" }}>
      <SearchBar
        placeholder="Search subjects..."
        value={searchQuery}
        onChangeText={handleSearchInputChange}
        containerStyle={{
          backgroundColor: appTheme.colors.primary,
        }}
        inputContainerStyle={{
          backgroundColor: appTheme.colors.quaternary,
        }}
        inputStyle={{
          color: appTheme.colors.primary,
        }}
        placeholderTextColor={appTheme.colors.placeholder}
        searchIcon={{
          name: 'search',
          type: 'ionicon',
          size: 20,
          color: appTheme.colors.inputicon,
        }}
        clearIcon={{
          name: 'close-circle',
          type: 'ionicon',
          size: 20,
          color: appTheme.colors.inputicon,
          onPress: () => setSearchQuery(''),
        }}
        onBlur={() => { }}
        onFocus={() => { }}
        platform="default"
        loadingProps={{
          size: 'small',
          color: appTheme.colors.textSecondary,
        }}
        showLoading={false} onClear={() => { }} onCancel={() => { }} lightTheme={false} round={false} cancelButtonTitle={''} cancelButtonProps={{
          buttonStyle: { backgroundColor: appTheme.colors.secondaryBackground },
          buttonTextStyle: { color: appTheme.colors.text },
        }}
        showCancel={false}
      />

      <ScrollView>
        <View className="flex-1 pt-2 pb-2 pl-8 pr-8 mt-4" style={{ backgroundColor: appTheme.colors.quaternary, height: "100%" }}>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <Subject key={subject.id} subject={subject} onSelect={handleSelectSubject} />
            ))
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text style={{ color: appTheme.colors.primary }}>No subjects found matching your search.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SubjectsPage;
