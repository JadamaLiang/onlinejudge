// CreateQuizPage.js
import React, { useState } from 'react';
import QuizQuestionType from './QuizQuestionType';

const CreateQuizPage = () => {
  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState([]);

  const handleQuestionTypeSelection = (type) => {
    setQuestionType(type);
    setOptions([]); // Clear options when question type changes
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCreateQuiz = () => {
    // Implement logic to create quiz with selected question type and options
  };

  return (
    <div>
      <h2>Create Quiz Page</h2>
      <QuizQuestionType onSelectQuestionType={handleQuestionTypeSelection} />
      {questionType && (
        <div>
          <h3>Options:</h3>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      )}
      <button onClick={handleCreateQuiz}>Create Quiz</button>
    </div>
  );
};

export default CreateQuizPage;
