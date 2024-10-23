import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/common/Card';

const QuestionsPage: React.FC = () => {
  const { appTheme } = useTheme();
  const { yearId, subjectId, examId, type } = useLocalSearchParams();

  const handleNavigate = (questiontype: 'view' | 'quiz') => {
    const route = questiontype === 'view' ? '/pyq/questions/view' : '/pyq/questions/quiz';
    router.push({
      pathname: route,
      params: { yearId, subjectId, examId, type, questiontype },
    });
  };

  return (
    <View className="flex-1 p-4 mt-10" style={{ backgroundColor: appTheme.colors.quaternary }}>
      <Card
        onPress={() => handleNavigate('view')}
        containerStyle={{
          paddingLeft: 16,
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 8,
          height: 60,
        }}
      >
        <View className="flex justify-between h-full">
          <Text className="text-xl font-semibold" style={{ color: appTheme.colors.white }}>
            View Questions
          </Text>

          {/* <View style={{ height: 1, backgroundColor: appTheme.colors.tertiary, marginVertical: 8 }} /> */}

          {/* <View style={{ backgroundColor: appTheme.colors.secondary, padding: 8, borderRadius: 8 }}>
            <Text className="text-base" style={{ color: appTheme.colors.white }}>
              Explore previous year questions.
            </Text>
          </View> */}
          {/* 
          <Text className="text-sm italic mt-2" style={{ color: appTheme.colors.quaternary }}>
            #Cortex Creative Minds
          </Text> */}
        </View>
      </Card>

      <Card
        onPress={() => handleNavigate('quiz')}
        containerStyle={{
          paddingLeft: 16,
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 8,
          height: 60,
          marginTop: 16,
        }}
      >
        <View className="flex justify-between h-full">
          <Text className="text-xl font-semibold" style={{ color: appTheme.colors.white }}>
            Take a Quiz
          </Text>

          {/* <View style={{ height: 1, backgroundColor: appTheme.colors.tertiary, marginVertical: 8 }} /> */}

          {/* <View style={{ backgroundColor: appTheme.colors.secondary, padding: 8, borderRadius: 8 }}>
            <Text className="text-base" style={{ color: appTheme.colors.white }}>
              Challenge yourself with a quiz.
            </Text>
          </View> */}

          {/* <Text className="text-sm italic mt-2" style={{ color: appTheme.colors.quaternary }}>
            #Cortex Creative Minds
          </Text> */}
        </View>
      </Card>

      <View style={{ height: 2, backgroundColor: appTheme.colors.tertiary, marginVertical: 20 }} />

      <View
        className="mt-8 p-4 items-center rounded-lg"
        style={{
          borderColor: appTheme.colors.errorText,
          borderWidth: 2,
          backgroundColor: appTheme.colors.quaternary,
        }}
      >
        <Text className="text-lg font-bold" style={{ color: appTheme.colors.errorText }}>
          Analytics ➔ Will be Updated Shortly.
        </Text>
      </View>
    </View>
  );
};

export default QuestionsPage;
