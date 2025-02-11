import React, { useState } from 'react';

interface TextQuestionProps {
    question: string;
    questionId: number;
    onAnswer: (answer: string) => void;
    isLastQuestion: boolean;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ question, questionId, onAnswer, isLastQuestion }) => {
    const [answer, setAnswer] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setAnswer(newValue);
        onAnswer(newValue);
    };

    return (
        <div className="space-y-4">
            <p className="text-lg font-medium">{question}</p>
            <p className="text-md text-gray-500 font-medium">Please enter your answer below:</p>
            <input
                type="text"
                value={answer}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your answer here..."
            />
        </div>
    );
};

export default TextQuestion;