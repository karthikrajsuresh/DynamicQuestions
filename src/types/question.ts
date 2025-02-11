export type QuestionType = 'YN' | 'TEXT' | 'MCQ';

export interface Question {
    question_id: number;
    question: string;
    question_type: string;
    options: string[];
}

export interface Answer {
    question_id: number;
    answer: string;
}

export interface QuestionsResponse {
    questions: Question[];
}

export interface AnswersPayload {
    answers: Answer[];
}