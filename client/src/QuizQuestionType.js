// QuizQuestionType.js
import React, { useState } from 'react';

const QuizQuestionType = ({ onSelectQuestionType }) => {
  const [questionType, setQuestionType] = useState('');

  const handleSelectType = (type) => {
    setQuestionType(type);
    onSelectQuestionType(type);
  };

  return (
    <div>
      <h3>Select Question Type:</h3>
      <label>
        <input
          type="radio"
          value="singleChoice"
          checked={questionType === 'singleChoice'}
          onChange={() => handleSelectType('singleChoice')}
        />
        Single Choice Question
      </label>
      <label>
        <input
          type="radio"
          value="multipleChoice"
          checked={questionType === 'multipleChoice'}
          onChange={() => handleSelectType('multipleChoice')}
        />
        Multiple Choice Question
      </label>
    </div>
  );
};

export default QuizQuestionType;
