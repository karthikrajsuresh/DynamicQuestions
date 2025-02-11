import React, { useState } from 'react';

interface YesNoQuestionProps {
    question: string;
    onAnswer: (answer: string) => void;
    isLastQuestion: boolean;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ question, onAnswer, isLastQuestion }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleSelect = (answer: string) => {
        setSelectedAnswer(answer);
        onAnswer(answer);
    };

    return (
        <div className="space-y-4">
            <p className="text-lg font-medium">{question}</p>
            <p className="text-md text-gray-500 font-medium">Select one of the options below:</p>
            <div className="space-x-2">
                {['Yes', 'No'].map((option) => (
                    <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`${selectedAnswer === option ? 'bluebtn' : 'graybtn'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default YesNoQuestion;