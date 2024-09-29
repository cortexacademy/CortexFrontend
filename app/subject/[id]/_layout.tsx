import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import Chapter from '@/components/QBank/Chapter';

const ChaptersModal: React.FC = () => {
  const { chapters } = useLocalSearchParams();
  const { appTheme } = useTheme();
  const parsedChapters = Array.isArray(chapters) ? chapters : (chapters ? JSON.parse(chapters) : []);

  return (
    <View
      style={{
        backgroundColor: appTheme.colors.background,
      }} className='flex-1 p-8'
    >
      {parsedChapters.length > 0 ? (
        parsedChapters.map((chapter: any) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))
      ) : (
        <Text style={{ color: appTheme.colors.text }}>No chapters available.</Text>
      )}
    </View>
  );
};

export default ChaptersModal;
