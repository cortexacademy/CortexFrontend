import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';

export default function PYQ() {
  const { appTheme } = useTheme();

  const handleNavigateToSubjects = (type: 'topics' | 'quiz') => {
    router.push({
      pathname: '/pyq/exam',
      params: { type },
    });
  };

  return (
    <View className="flex-1 p-4 justify-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
      <TouchableOpacity onPress={() => handleNavigateToSubjects('topics')}>
        <View
          className="rounded-xl p-6 mb-6 shadow-lg"
          style={{
            backgroundColor: appTheme.colors.secondaryBackground,
            borderColor: appTheme.colors.primary,
            borderWidth: 1,
          }}
        >
          <Text className="text-xl font-semibold mb-2" style={{ color: appTheme.colors.text }}>
            Previous Year Topics
          </Text>
          <Text className="text-base" style={{ color: appTheme.colors.mutedText }}>
            Revise cardinal points before the exam.
          </Text>
          <Text className="text-sm italic mt-2" style={{ color: appTheme.colors.textSecondary }}>
            #Cortex Creative Minds
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigateToSubjects('quiz')}>
        <View
          className="rounded-xl p-6 mb-6 shadow-lg"
          style={{
            backgroundColor: appTheme.colors.secondaryBackground,
            borderColor: appTheme.colors.primary,
            borderWidth: 1,
          }}
        >
          <Text className="text-xl font-semibold mb-2" style={{ color: appTheme.colors.text }}>
            Previous Year Questions
          </Text>
        </View>
      </TouchableOpacity>

      <View className="mt-8 flex items-center">
        <Text className="text-lg font-bold" style={{ color: appTheme.colors.errorText }}>
          G.T ➔ Will be Updated Shortly.
        </Text>
      </View>
    </View>
  );
}
