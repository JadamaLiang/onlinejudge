import React, { useState } from 'react';

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState('single');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [grade, setGrade] = useState(5);
  const [gradingType, setGradingType] = useState('rightMinusWrong');
  const [allowNegative, setAllowNegative] = useState(true);

  const handleAddQuestion = () => {
    const newQuestion = {
      type: questionType,
      question: questionText,
      options: questionType === 'fillInBlank' ? [] : options,
      answer: questionType === 'fillInBlank' ? [answer] : answer,
      grade,
      gradingType,
      allowNegative,
    };
    setQuestions([...questions, newQuestion]);
    // Reset form fields after adding question
    setQuestionType('single');
    setQuestionText('');
    setOptions([]);
    setAnswer('');
    setGrade(5);
    setGradingType('rightMinusWrong');
    setAllowNegative(true);
  };

  const handleQuizSubmit = () => {
    // Submit quiz data to backend (e.g., via API call)
    const quizData = {
      title: quizTitle,
      questions,
    };
    console.log(quizData); // For demonstration purposes, log quiz data to console
    // You can make an API call to send quizData to the server
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <label htmlFor="quizTitle">Quiz Title:</label>
      <input
        type="text"
        id="quizTitle"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <hr />
      <h3>Add Question</h3>
      <label htmlFor="questionType">Question Type:</label>
      <select
        id="questionType"
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
      >
        <option value="single">Single Choice</option>
        <option value="multi">Multiple Choice</option>
        <option value="fillInBlank">Fill in the Blank</option>
        <option value="trueFalse">True or False</option>
      </select>
      <br />
      <label htmlFor="questionText">Question Text:</label>
      <input
        type="text"
        id="questionText"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <br />
      {questionType !== 'fillInBlank' && (
        <div>
          <label htmlFor="options">Options:</label>
          <input
            type="text"
            id="options"
            value={options}
            onChange={(e) => setOptions(e.target.value.split(','))}
          />
          <br />
        </div>
      )}
      <label htmlFor="answer">Answer:</label>
      <input
        type="text"
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <label htmlFor="grade">Grade:</label>
      <input
        type="number"
        id="grade"
        value={grade}
        onChange={(e) => setGrade(Number(e.target.value))}
      />
      <br />
      <label htmlFor="gradingType">Grading Type:</label>
      <select
        id="gradingType"
        value={gradingType}
        onChange={(e) => setGradingType(e.target.value)}
      >
        <option value="rightMinusWrong">Right Minus Wrong</option>
        <option value="allOrNothing">All or Nothing</option>
      </select>
      <br />
      <label htmlFor="allowNegative">Allow Negative:</label>
      <input
        type="checkbox"
        id="allowNegative"
        checked={allowNegative}
        onChange={(e) => setAllowNegative(e.target.checked)}
      />
      <br />
      <button onClick={handleAddQuestion}>Add Question</button>
      <hr />
      <h3>Questions:</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.question}</li>
        ))}
      </ul>
      <button onClick={handleQuizSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuizPage;
