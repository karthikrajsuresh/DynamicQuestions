import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setQuestions, setAnswer, nextQuestion, setError } from '../store/questionSlice';
import YesNoQuestion from '../components/questions/YesNoQuestion';
import TextQuestion from '../components/questions/TextQuestion';
import MCQQuestion from '../components/questions/MCQQuestion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';

interface DynamicQuestionProps {
    onComplete: () => void;
}

const DynamicQuestion: React.FC<DynamicQuestionProps> = ({ onComplete }) => {
    // const DynamicQuestion: React.FC = () => {
    const dispatch = useDispatch();
    const { questions, currentQuestionIndex, answers, error } = useSelector(
        (state: RootState) => state.questions
    );
    const [canProceed, setCanProceed] = useState(false);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await fetch('/data/questions.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(setQuestions(data.questions));
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to load questions';
                dispatch(setError(errorMessage));
            }
        };

        loadQuestions();
    }, [dispatch]);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswer = (answer: string) => {
        try {
            dispatch(
                setAnswer({
                    question_id: currentQuestion.question_id,
                    answer,
                })
            );
            setCanProceed(!!answer.trim());
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to save answer';
            dispatch(setError(errorMessage));
        }
    };

    const handleNext = () => {
        if (!canProceed) return;

        if (isLastQuestion) {
            try {
                const formattedAnswers = { answers: answers };
                console.log({ formattedAnswers });
                console.log(`${JSON.stringify(formattedAnswers)}`);
                onComplete();
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to submit answers';
                dispatch(setError(errorMessage));
            }
            return;
        }

        dispatch(nextQuestion());
        setCanProceed(false);
    };

    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        return 'An unexpected error occurred';
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;
        try {
            const questionType = currentQuestion.question_type.toUpperCase();
            const key = `question-${currentQuestion.question_id}-${currentQuestionIndex}`;
            switch (questionType) {
                case 'YN':
                    return (
                        <YesNoQuestion
                            key={key}
                            question={currentQuestion.question}
                            onAnswer={handleAnswer}
                            isLastQuestion={isLastQuestion}
                        />
                    );
                case 'TEXT':
                    return (
                        <TextQuestion
                            key={key}
                            question={currentQuestion.question}
                            questionId={currentQuestion.question_id}
                            onAnswer={handleAnswer}
                            isLastQuestion={isLastQuestion}
                        />
                    );
                case 'MCQ':
                    return (
                        <MCQQuestion
                            key={key}
                            question={currentQuestion.question}
                            options={currentQuestion.options}
                            onAnswer={handleAnswer}
                            isLastQuestion={isLastQuestion}
                        />
                    );
                default:
                    throw new Error(`Unsupported question type: ${questionType}`);
            }
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            dispatch(setError(`Error rendering question: ${errorMessage}`));
            return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
            <Header />
            {/* <main className="flex-1 container mx-auto px-4 py-8  p-11 rounded-lg bg-white"> */}
            <div className="flex-1 max-lg: mx-28 p-11 rounded-lg bg-transparent">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="max-w-2xl mx-auto">
                    {questions.length > 0 && (
                        <ProgressBar
                            current={currentQuestionIndex + 1}
                            total={questions.length}
                        />
                    )}
                    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                        {renderQuestion()}
                        <div className="mt-8">
                            <button
                                onClick={handleNext}
                                disabled={!canProceed}
                                className={`px-6 py-2 rounded ${canProceed
                                    ? 'greenbtn text-white hover:bg-blue-700 rounded-full'
                                    : 'graybtn cursor-not-allowed rounded-full'
                                    }`}
                            >
                                {isLastQuestion ? 'Submit' : 'Submit and Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </main> */}
            <Footer />
        </div>
    );
};

export default DynamicQuestion;