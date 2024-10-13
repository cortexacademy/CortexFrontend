import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useApi, ApiResponse } from '@/hooks/useApi';
import { Loader } from '@/components/LoaderComponent';
import { useTheme } from '@/hooks/useTheme';
import { Button } from 'react-native-elements';

interface QuestionData {
  statement: string;
  options: Array<{
    id: number;
    statement: string;
    is_correct: boolean;
  }>;
  solution: {
    statement: string;
  };
}

// interface ApiResponse {
//   data: QuestionData;
// }

const QuestionPage: React.FC = () => {
  const { appTheme } = useTheme();
  const token = process.env.TOKEN;
  const { data, isLoading, error } = useApi<ApiResponse<QuestionData>>(`${process.env.EXPO_PUBLIC_API_URL}/question/3/`, token);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const handleOptionSelect = (optionId: number, isCorrect: boolean) => {
    setSelectedOption(optionId);
    setIsOptionSelected(true);
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-errorBackground">
        <Text className="text-errorText">
          Error: {error.message} (Status: {error.status})
        </Text>
      </View>
    );
  }

  if (!data || !data.data) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-textSecondary">No question data available.</Text>
      </View>
    );
  }

  const { statement, options, solution } = data.data;

  return (
    <View style={{ padding: 16, backgroundColor: appTheme.colors.quaternary }} className="bg-quaternary">
      <View className="rounded-lg p-4 my-3 shadow-md" style={{ backgroundColor: appTheme.colors.tertiary }}>
        <Markdown>{statement}</Markdown>
      </View>

      <View className="bg-white rounded-lg p-4 mt-2 shadow-md">
        {options.map((option: any) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.is_correct;

          const backgroundColor = isOptionSelected
            ? isSelected
              ? isCorrect ? 'bg-green-200' : 'bg-red-200'
              : isCorrect ? 'bg-green-200' : 'bg-gray-100'
            : 'bg-white';

          return (
            <TouchableOpacity
              key={option.id}
              className="flex-1"
              onPress={() => handleOptionSelect(option.id, option.is_correct)}
            >
              <View
                key={option.id}
                className={`flex-row items-center mb-2 p-2 rounded-lg shadow-sm border border-gray-300 ${backgroundColor}`}
              >
                <Markdown>{option.statement}</Markdown>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row justify-start mt-5">
        <Button
          className="w-1/2 items-center rounded-lg shadow-lg"
          style={{ backgroundColor: appTheme.colors.primary }}
          onPress={() => setShowSolution(!showSolution)}
          title={!showSolution ? 'Show Solution' : 'Hide Solution'}
          buttonStyle={{
            backgroundColor: appTheme.colors.primary,
            // width: '100%',
          }}
          titleStyle={{ color: appTheme.colors.text }}
        />
      </View>


      {showSolution && (
        <View className="bg-white rounded-lg p-4 mt-5 shadow-md">
          <Text className="text-primary font-bold">Solution:</Text>
          <Markdown>{solution?.statement}</Markdown>
        </View>
      )}
    </View>
  );
};

export default QuestionPage;
