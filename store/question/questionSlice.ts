import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Question {
  id: number;
  years: { id: number; year: string }[];
  subject: { id: number; name: string; exams: { id: number }[] }[];
  statement: string;
  options: { id: number; statement: string; is_correct: boolean }[];
  solution: { id: number; statement: string };
  user_attempt: { id: number; is_first: boolean; selected_option: number[] };
}

interface QuestionState {
  data: Question[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuestionState = {
  data: [],
  status: "idle",
  error: null,
};

function filterQuestionsByIds(
  questions: Question[],
  filterIds: number[]
): Question[] {
  return questions.filter((question) => filterIds.includes(question.id));
}

// Async thunk to fetch questions
export const fetchQuestions = createAsyncThunk(
  "question/",
  async (token: string) => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/question/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch questions";
      });
  },
});

export default questionSlice.reducer;
