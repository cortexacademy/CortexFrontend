import React from 'react';
import { View, Text } from 'react-native';
import { ChapterProps } from './types';

const Chapter: React.FC<{ chapter: ChapterProps }> = ({ chapter }) => {
  return (
    <View
      key={chapter.id}
      className="w-full bg-white rounded-lg shadow-md mb-4 p-4 border border-gray-300"
    >
      <Text className="text-black text-lg font-semibold">{chapter.name}</Text>
      <Text className="text-gray-600 mt-2">{chapter.description || 'No description available'}</Text>
    </View>
  );
};

export default Chapter;
