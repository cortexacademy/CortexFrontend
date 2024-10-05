import React from 'react';
import { View, Text, Image } from 'react-native';
import { ChapterProps } from './types';
import { useTheme } from '@/hooks/useTheme';

const Chapter: React.FC<{ chapter: ChapterProps }> = ({ chapter }) => {
  const { appTheme } = useTheme();

  return (
    <View
      key={chapter.id}
      style={{
        backgroundColor: appTheme.colors.primary,
        borderRadius: appTheme.borderRadius.small,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: appTheme.spacing.medium,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: appTheme.colors.secondary,
        borderLeftWidth: 6,
        padding: appTheme.spacing.small,
      }}
    >
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
    </View>
  );
};

export default Chapter;
