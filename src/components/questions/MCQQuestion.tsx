import React, { useState } from 'react';

interface MCQQuestionProps {
    question: string;
    options: string[];
    onAnswer: (answer: string) => void;
    isLastQuestion: boolean;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ question, options, onAnswer, isLastQuestion }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onAnswer(option);
    };

    return (
        <div className="space-y-4">
            <p className="text-lg font-medium">{question}</p>
            <p className="text-md text-gray-500 font-medium">choose one of the following options:</p>
            <div className="space-y-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`w-full px-4 py-2 text-left rounded ${selectedOption === option
                            ? 'bluebtn text-white'
                            : 'graybtn hover:bg-gray-300'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MCQQuestion;