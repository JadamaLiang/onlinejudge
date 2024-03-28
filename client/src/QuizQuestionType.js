import React, { useState } from 'react';

const QuizQuestionType = ({ onSelectQuestionType }) => {
  const [questionType, setQuestionType] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [options, setOptions] = useState(['']);
  const [gradingType, setGradingType] = useState('RightMinusWrong'); // Default grading type
  const [allowNegative, setAllowNegative] = useState(false);

  const handleSelectType = (type) => {
    setQuestionType(type);
    onSelectQuestionType(type);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  return (
    <div>
      <h3>选择题型:</h3>
      <label>
        <input
          type="radio"
          value="singleChoice"
          checked={questionType === 'singleChoice'}
          onChange={() => handleSelectType('singleChoice')}
        />
        单选题
      </label>
      <label>
        <input
          type="radio"
          value="multipleChoice"
          checked={questionType === 'multipleChoice'}
          onChange={() => handleSelectType('multipleChoice')}
        />
        多选题
      </label>
      <label>
        <input
          type="radio"
          value="fillInTheBlanks"
          checked={questionType === 'fillInTheBlanks'}
          onChange={() => handleSelectType('fillInTheBlanks')}
        />
        填空题
      </label>
      <label>
        <input
          type="radio"
          value="trueOrFalse"
          checked={questionType === 'trueOrFalse'}
          onChange={() => handleSelectType('trueOrFalse')}
        />
        判断题
      </label>
      {questionType && (
        <div>
          <h3>题目:</h3>
          <input
            type="text"
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
            placeholder="Enter question content"
          />
          {questionType === 'singleChoice' && (
            <div>
                <h3>选择:</h3>
                {options.map((option, index) => (
                    <div key={index}>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                        const updatedOptions = [...options];
                        updatedOptions[index] = e.target.value;
                        setOptions(updatedOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
              <button onClick={handleAddOption}>添加选择</button>
            </div>
          )}
          {questionType === 'multipleChoice' && (
            <div>
              <h3>选择:</h3>
              {options.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[index] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
              <button onClick={handleAddOption}>添加选择</button>
              <div>
                <label>
                  评分方式:
                  <select
                    value={gradingType}
                    onChange={(e) => setGradingType(e.target.value)}
                  >
                    <option value="RightMinusWrong">对减错</option>
                    <option value="AllorNothing">全对或全错</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={allowNegative}
                    onChange={() => setAllowNegative(!allowNegative)}
                  />
                  允许负成绩
                </label>
              </div>
            </div>
          )}
          {questionType === 'fillInTheBlanks' && (
            <div>
                <h3>选择:</h3>
                {options.map((option, index) => (
                    <div key={index}>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                        const updatedOptions = [...options];
                        updatedOptions[index] = e.target.value;
                        setOptions(updatedOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
              <button onClick={handleAddOption}>添加选择</button>
            </div>
          )}
          {questionType === 'trueOrFalse' ? (
        <div>
          <label>
            <input
              type="radio"
              value="true"
              checked={options[0] === 'true'}
              onChange={() => setOptions(['true'])}
            />
            对
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={options[0] === 'false'}
              onChange={() => setOptions(['false'])}
            />
            错
          </label>
        </div>
      ) : null}
        </div>
    )}
    </div>
  );
};

export default QuizQuestionType;
