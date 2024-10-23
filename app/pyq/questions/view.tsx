import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Switch, Animated, Alert, BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "@/store/question/questionSlice";
import { Icon } from "react-native-elements";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "react-native-elements";
import { Loader } from "@/components/common/LoaderComponent";
import { AppDispatch, RootState } from "@/store";
import { QuestionComponent } from "@/components/QBank/Question";
import { useLocalSearchParams } from "expo-router";

const QuestionPage: React.FC = () => {
  const { appTheme } = useTheme();
  const { yearId, subjectId, examId } = useLocalSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [viewSolutions, setViewSolutions] = useState<boolean>(false);
  const { data: questions, status, error } = useSelector((state: RootState) => state.questions);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchQuestions(process.env.EXPO_PUBLIC_API_TOKEN!));

      const filteredQuestions = questions
        ? questions.filter((question) => {
          const hasYear = question.years.some((year) => year.id === Number(yearId));
          const hasSubject = question.subject.some((subject) => subject.id === Number(subjectId));
          const hasExam = question.subject.some((subject) =>
            subject.exams.some((exam) => exam.id === Number(examId))
          );

          return hasYear && hasSubject && hasExam;
        })
        : [];

      // Set the first question ID if available
      if (filteredQuestions.length > 0) {
        setSelectedQuestionId(filteredQuestions[0].id);
      }
    };

    fetchData();
  }, [dispatch, yearId, subjectId, examId]);

  // Determine filtered questions
  const filteredQuestions = questions
    ? questions.filter((question) => {
      const hasYear = question.years.some((year) => year.id === Number(yearId));
      const hasSubject = question.subject.some((subject) => subject.id === Number(subjectId));
      const hasExam = question.subject.some((subject) =>
        subject.exams.some((exam) => exam.id === Number(examId))
      );

      return hasYear && hasSubject && hasExam;
    })
    : [];

  useEffect(() => {
    if (filteredQuestions.length > 0 && !selectedQuestionId) {
      setSelectedQuestionId(filteredQuestions[0].id);
    }
  }, [filteredQuestions, selectedQuestionId]);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Exit App?", "Are you sure you want to exit the App?", [
  //       {
  //         text: "Stay",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "Exit", onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestionId(questionId);
    toggleMenu();
  };

  if (status === "loading") return <Loader />;

  if (status === "failed") {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-errorText">Error: {error}</Text>
      </View>
    );
  }

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-textSecondary">No question data available.</Text>
      </View>
    );
  }

  const selectedQuestion = filteredQuestions.find((question) => question.id === selectedQuestionId);


  const currentIndex = filteredQuestions.findIndex(q => q.id === selectedQuestionId);
  const goToNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setSelectedQuestionId(filteredQuestions[currentIndex + 1].id);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setSelectedQuestionId(filteredQuestions[currentIndex - 1].id);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.colors.quaternary }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 40,
          paddingHorizontal: 16,
          backgroundColor: appTheme.colors.primary,
        }}
      >
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color={appTheme.colors.white} />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10, color: appTheme.colors.white }}>Show All Solutions</Text>
          <Switch value={viewSolutions} onValueChange={() => setViewSolutions(!viewSolutions)}
            thumbColor={viewSolutions ? appTheme.colors.secondary : appTheme.colors.tertiary}
            trackColor={{
              false: appTheme.colors.quaternary,
              true: appTheme.colors.tertiary,
            }}
          />
        </View>
      </View>

      <Modal visible={menuVisible} animationType="slide" transparent={true} style={{ backgroundColor: appTheme.colors.primary }}>
        <View style={{
          flex: 1,
          backgroundColor: appTheme.colors.primary,
          padding: 16,
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: '60%',
          width: '100%',
          zIndex: 999,
        }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }} className="pl-3">
            <Text text-xl style={{ fontSize: 20, fontWeight: 'bold', color: appTheme.colors.quaternary }}>All Questions</Text>
            <TouchableOpacity onPress={toggleMenu} style={{ marginRight: 10, alignSelf: "flex-end" }}>
              <Icon name="close" size={30} color={appTheme.colors.quaternary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {filteredQuestions.map((question, index) => (
              <TouchableOpacity key={question.id} onPress={() => handleQuestionSelect(question.id)}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: appTheme.colors.quaternary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, color: appTheme.colors.primary }}>{index + 1}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Button
            buttonStyle={{ backgroundColor: appTheme.colors.quaternary }}
            titleStyle={{ color: appTheme.colors.primary }}
            title="Exit" onPress={() => console.log('Exit Quiz')} />
        </View>
      </Modal>
      <ScrollView style={{ flex: 1, borderBottomColor: 'black' }}>
        {selectedQuestion && (
          <QuestionComponent
            question={selectedQuestion}
            viewsolution={viewSolutions}
            index={currentIndex + 1}
          />
        )}
      </ScrollView>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: appTheme.colors.primary,
        }}
      >

        <Button
          title="Back"
          onPress={goToPreviousQuestion}
          disabled={selectedQuestionId === filteredQuestions[0]?.id}
          buttonStyle={{ width: "90%", backgroundColor: appTheme.colors.secondary }}
        />
        <Button
          title="Next"
          onPress={goToNextQuestion}
          disabled={selectedQuestionId === filteredQuestions[filteredQuestions.length - 1]?.id}
          buttonStyle={{ width: '90%', backgroundColor: appTheme.colors.secondary }}
        />
      </View>
    </View>
  );
};

export default QuestionPage;
