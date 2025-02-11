// src/store/questionSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, Answer } from '../types/question';

interface QuestionState {
    questions: Question[];
    currentQuestionIndex: number;
    answers: Answer[];
    error: string | null;
    isLoading: boolean;
}

const initialState: QuestionState = {
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    error: null,
    isLoading: false,
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setAnswer: (state, action: PayloadAction<Answer>) => {
            const existingAnswerIndex = state.answers.findIndex(
                answer => answer.question_id === action.payload.question_id
            );

            if (existingAnswerIndex !== -1) {
                state.answers[existingAnswerIndex] = action.payload;
            } else {
                state.answers.push(action.payload);
            }
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        resetQuestions: (state) => {
            state.currentQuestionIndex = 0;
            state.answers = [];
            state.error = null;
        }
    },
});

export const {
    setQuestions,
    setAnswer,
    nextQuestion,
    setError,
    setLoading,
    resetQuestions
} = questionSlice.actions;

export default questionSlice.reducer;