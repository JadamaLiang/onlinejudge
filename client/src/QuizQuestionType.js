// QuizQuestionType.js
import React, { useState } from 'react';

const QuizQuestionType = ({ onSelectQuestionType }) => {
  const [questionType, setQuestionType] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [options, setOptions] = useState(['']); // Initial option

  const handleSelectType = (type) => {
    setQuestionType(type);
    onSelectQuestionType(type);
    setOptions(['']); // Reset options when question type changes

    // Automatically set options for True or False type
    if (type === 'trueOrFalse') {
      setOptions(['true', 'false']);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']); // Add new empty option
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const renderOptionsInputs = () => {
    if (questionType === 'trueOrFalse') {
      return (
        <div>
          <label>
            <input
              type="radio"
              value="true"
              checked={options[0] === 'true'}
              onChange={() => setOptions(['true'])}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={options[0] === 'false'}
              onChange={() => setOptions(['false'])}
            />
            False
          </label>
        </div>
      );
    }

    return options.map((option, index) => (
      <div key={index}>
        <input
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
          disabled={questionType === 'trueOrFalse'} // Disable input for True or False type
        />
      </div>
    ));
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
      <label>
        <input
          type="radio"
          value="fillInTheBlanks"
          checked={questionType === 'fillInTheBlanks'}
          onChange={() => handleSelectType('fillInTheBlanks')}
        />
        Fill in the Blanks
      </label>
      <label>
        <input
          type="radio"
          value="trueOrFalse"
          checked={questionType === 'trueOrFalse'}
          onChange={() => handleSelectType('trueOrFalse')}
        />
        True or False
      </label>
      {questionType && (
        <div>
          <h3>Question Content:</h3>
          <input
            type="text"
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
            placeholder="Enter question content"
          />
        </div>
      )}
      {questionType === 'singleChoice' || questionType === 'multipleChoice' ? (
        <div>
          <h3>Options:</h3>
          {renderOptionsInputs()}
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      ) : null}
      {questionType === 'trueOrFalse' ? (
        <div>
          <label>
            <input
              type="radio"
              value="true"
              checked={options[0] === 'true'}
              onChange={() => setOptions(['true'])}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={options[0] === 'false'}
              onChange={() => setOptions(['false'])}
            />
            False
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default QuizQuestionType;
