import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Loader } from '@/components/common/LoaderComponent';
import { useTheme } from '@/hooks/useTheme';
import { Button } from 'react-native-elements';

interface QuestionOption {
  id: number;
  statement: string;
  is_correct: boolean;
}

interface QuestionData {
  id: number;
  statement: string;
  options: QuestionOption[];
  solution: {
    statement: string;
  };
  user_attempt?: {
    selected_option: number[];
  } | null;
}

interface QuestionComponentProps {
  question: QuestionData;
  viewsolution?: boolean;
  showUserAttempts?: boolean;
  index?: number;
  isquiz?: boolean;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ isquiz = false, showUserAttempts = false, question, viewsolution = false, index }) => {
  const { appTheme } = useTheme();
  const [showSolution, setShowSolution] = useState<boolean>(viewsolution);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  useEffect(() => {
    if (question.user_attempt && showUserAttempts && question.user_attempt.selected_option.length > 0) {
      setSelectedOption(question.user_attempt.selected_option[0]);
      setIsOptionSelected(true);
    }
  }, [question]);

  useEffect(() => {
    setShowSolution(viewsolution);
  }, [viewsolution]);

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
    setIsOptionSelected(true);
    setShowSolution(true)
  };

  const { statement, options, solution } = question;

  return (
    <ScrollView style={{ padding: 8, backgroundColor: appTheme.colors.quaternary }}>
      <View className="rounded-lg p-4 my-3 shadow-md" style={{ backgroundColor: appTheme.colors.tertiary }}>
        {index &&
          <Text className="text-xl font-bold">Question {index}:</Text>
        }
        <Markdown>{statement}</Markdown>
      </View>

      <View className="bg-white rounded-lg p-4 mt-2 shadow-md">
        {options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          // const isCorrect = option.is_correct;

          const backgroundColor = isquiz
            ? isSelected ? 'bg-blue-200' : 'bg-white'
            : isOptionSelected
              ? isSelected
                ? option.is_correct ? 'bg-green-200' : 'bg-red-200'
                : option.is_correct ? 'bg-green-200' : 'bg-gray-100'
              : 'bg-white';

          return (
            <TouchableOpacity
              key={option.id}
              className="flex-1"
              onPress={() => handleOptionSelect(option.id)}
            // disabled={isOptionSelected}
            >
              <View
                className={`flex-row items-center mb-2 p-2 rounded-lg shadow-sm border border-gray-300 ${backgroundColor}`}
              >
                {/* <Text className="text-xl font-bold">{optionLabels[index]}:</Text> */}
                <Markdown>{option.statement}</Markdown>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {!isquiz &&
        <View className="mt-5">
          <Button
            className="w-1/2 items-center rounded-lg shadow-lg"
            style={{ backgroundColor: appTheme.colors.primary }}
            onPress={() => setShowSolution(!showSolution)}
            title={!showSolution ? 'Show Solution' : 'Hide Solution'}
            buttonStyle={{
              backgroundColor: appTheme.colors.primary,
            }}
            titleStyle={{ color: appTheme.colors.contrast, fontFamily: appTheme.fontFamily, fontSize: 18 }}
          />
        </View>
      }

      {showSolution && !isquiz ? (
        <View className="bg-white rounded-lg p-4 mt-5 shadow-md">
          <Text className="text-xl font-bold">Solution:</Text>
          <Markdown>{solution.statement}</Markdown>
        </View>
      ) : ''}
    </ScrollView>
  );
};