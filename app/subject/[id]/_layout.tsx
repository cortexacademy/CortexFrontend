import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { SearchableList } from '@/components/common/SearchableList';
import Chapter from '@/components/QBank/Chapter';

const ChaptersModal: React.FC = () => {
  const { chapters } = useLocalSearchParams();
  const { appTheme } = useTheme();
  const parsedChapters = Array.isArray(chapters) ? chapters : (chapters ? JSON.parse(chapters) : []);

  if (!parsedChapters || parsedChapters.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
        <Text style={{ color: appTheme.colors.primary }}>No chapters available.</Text>
      </View>
    );
  }

  return (
    <SearchableList
      items={parsedChapters}
      searchKey="name"
      renderItem={(chapter: any) => (
        <Chapter key={chapter.id} chapter={chapter} />
      )}
      noItemsText="No chapters found matching your search."
    />
  );
};

export default ChaptersModal;
