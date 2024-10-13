import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { Card } from '@/components/common/Card';

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
      <Card
        onPress={() => handleNavigateToSubjects('topics')}
        containerStyle={{
          paddingLeft: 16,
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 8,
          height: 200,
        }}
      >
        <View className="flex justify-between h-full">
          <Text className="text-xl font-semibold" style={{ color: appTheme.colors.white }}>
            Previous Year Topics
          </Text>

          <View style={{ height: 1, backgroundColor: appTheme.colors.tertiary, marginVertical: 8 }} />

          <View style={{ backgroundColor: appTheme.colors.secondary, padding: 8, borderRadius: 8 }}>
            <Text className="text-base" style={{ color: appTheme.colors.white }}>
              Revise cardinal points before the exam. Revise cardinal points before the exam. Revise cardinal points before the exam.
            </Text>
          </View>

          <Text className="text-sm italic mt-2" style={{ color: appTheme.colors.quaternary }}>
            #Cortex Creative Minds
          </Text>
        </View>
      </Card>

      <Card
        onPress={() => handleNavigateToSubjects('quiz')}
        containerStyle={{
          paddingLeft: 16,
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 8,
          height: 200,
          marginTop: 16,
        }}
      >
        <View className="flex justify-between h-full">
          <Text className="text-xl font-semibold" style={{ color: appTheme.colors.white }}>
            Previous Year Questions
          </Text>

          <View style={{ height: 1, backgroundColor: appTheme.colors.tertiary, marginVertical: 8 }} />

          <View style={{ backgroundColor: appTheme.colors.secondary, padding: 8, borderRadius: 8 }}>
            <Text className="text-base" style={{ color: appTheme.colors.white }}>
              Revise cardinal points before the exam. Revise cardinal points before the exam. Revise cardinal points before the exam.
            </Text>
          </View>

          <Text className="text-sm italic mt-2" style={{ color: appTheme.colors.quaternary }}>
            #Cortex Creative Minds
          </Text>
        </View>
      </Card>

      <View
        className="mt-8 p-4 items-center rounded-lg"
        style={{
          borderColor: appTheme.colors.errorText,
          borderWidth: 2,
          backgroundColor: appTheme.colors.quaternary,
        }}
      >
        <Text className="text-lg font-bold" style={{ color: appTheme.colors.errorText }}>
          G.T ➔ Will be Updated Shortly.
        </Text>
      </View>
    </View>
  );
}
