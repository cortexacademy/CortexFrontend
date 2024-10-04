import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Subject as SubjectType } from './types';
import { useTheme } from '@/hooks/useTheme';

interface SubjectProps {
  subject: SubjectType;
  onSelect: (subject: SubjectType) => void;
}

const Subject: React.FC<SubjectProps> = ({ subject, onSelect }) => {
  const { appTheme } = useTheme();

  return (
    <TouchableOpacity onPress={() => onSelect(subject)} activeOpacity={0.7}>
      <View
        key={subject.id}
        style={{
          backgroundColor: appTheme.colors.primary,
          borderRadius: appTheme.borderRadius.small,
          shadowColor: "#000",
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
      </View>
    </TouchableOpacity>
  );
};

export default Subject;
