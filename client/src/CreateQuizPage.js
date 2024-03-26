// CreateQuizPage.js
import React, { useState } from 'react';
import QuizQuestionType from './QuizQuestionType';
import QuizPage from './QuizPage';

const CreateQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [questionSaved, setQuestionSaved] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: questionType, content: questionContent, options: [] }]);
    // Clear input fields after saving the question
    setQuestionType('');
    setQuestionContent('');
    setShowDeleteButton(false);
    setShowSaveButton(false);
    setQuestionSaved(true);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    setShowDeleteButton(false);
    setShowSaveButton(false);
    setQuestionSaved(false);
  };

  const handleSaveQuestion = () => {
    setQuestions([...questions, { type: questionType, content: questionContent, options: [] }]);
    // Clear input fields after saving the question
    setQuestionType('');
    setQuestionContent('');
    setShowDeleteButton(false);
    setShowSaveButton(false);
    setQuestionSaved(true);
  };

  const handleSubmitQuiz = () => {
    // Submit quiz data (e.g., send to backend)
    console.log({ quizTitle, questions });
    // Simulate successful submission for demonstration purposes
    setQuizSubmitted(true);
  };

  return (
    <div>
      <h2>Create Quiz Page</h2>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
      />
      <QuizQuestionType
        onSelectQuestionType={(type) => {
          setQuestionType(type);
          setShowDeleteButton(true); // Show delete button when question type is chosen
          setShowSaveButton(true); // Show save button when question type is chosen
        }}
        onQuestionContentChange={(content) => setQuestionContent(content)}
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      {showDeleteButton && (
        <button onClick={handleDeleteQuestion}>Delete Question</button>
      )}
      {showSaveButton && (
        <button onClick={handleSaveQuestion}>Save Question</button>
      )}
      {questionSaved && <p>Question saved</p>}
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
      {quizSubmitted && <QuizPage />} {/* Render QuizPage after submission */}
      {questions.map((question, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>
          {showDeleteButton && (
            <button onClick={() => handleDeleteQuestion(index)}>Delete Question</button>
          )}
          {showSaveButton && (
            <button onClick={handleSaveQuestion}>Save Question</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreateQuizPage;
