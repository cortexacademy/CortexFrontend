import React from 'react';
import { View, Text, Image } from 'react-native';
import { ChapterProps } from './types';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '../common/Card';

const Chapter: React.FC<{ chapter: ChapterProps }> = ({ chapter }) => {
  const { appTheme } = useTheme();

  return (
    <Card>
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
        <Text
          style={{
            color: appTheme.colors.white,
            fontSize: appTheme.fontSizes.medium,
            fontWeight: 'bold',
          }}
        >
          {chapter.name}
        </Text>
        <Text
          style={{
            color: appTheme.colors.white,
            fontSize: appTheme.fontSizes.small,
            marginTop: appTheme.spacing.small,
          }}
        >
          {chapter.description || 'No description available'}
        </Text>
      </View>
    </Card>
  );
};

export default Chapter;
