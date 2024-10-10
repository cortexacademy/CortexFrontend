import React from 'react';
import { View, Text, Image } from 'react-native';
import { Subject as SubjectType } from './types';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '../common/Card';

interface SubjectProps {
  subject: SubjectType;
  onSelect: (subject: SubjectType) => void;
}

const Subject: React.FC<SubjectProps> = ({ subject, onSelect }) => {
  const { appTheme } = useTheme();

  return (
    <Card onPress={() => onSelect(subject)}>
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
          {subject.name}
        </Text>
        <Text
          style={{
            color: appTheme.colors.white,
            fontSize: appTheme.fontSizes.small,
            marginTop: appTheme.spacing.small,
          }}
        >
          {subject.chapters.length} Chapters available
        </Text>
      </View>
    </Card>
  );
};

export default Subject;
