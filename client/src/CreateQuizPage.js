import React, { useState } from 'react';
import QuizQuestionType from './QuizQuestionType';
import QuizPage from './QuizPage';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [questionSaved, setQuestionSaved] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false); // Corrected useState usage
  const navigate = useNavigate();

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
    navigate('/quiz');
  };

  return (
    <div>
      <h2>创建试卷</h2>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="试卷名"
      />
      <QuizQuestionType
        onSelectQuestionType={(type) => {
          setQuestionType(type);
          setShowDeleteButton(true); // Show delete button when question type is chosen
          setShowSaveButton(true); // Show save button when question type is chosen
          setShowAddQuestion(true);
        }}
        onQuestionContentChange={(content) => setQuestionContent(content)}
      />
      {showAddQuestion && (
        <button onClick={handleAddQuestion}>添加下一个题目</button>
      )}
      {showSaveButton && (
        <button onClick={handleSaveQuestion}>保存题目</button>
      )}
      {questionSaved && <p>题目保存成功</p>}
      <button onClick={handleSubmitQuiz}>提交试卷</button>
      {quizSubmitted && <QuizPage />} {/* Render QuizPage after submission */}
      {questions.map((question, index) => (
        <div key={index}>
          <h3>题目 {index + 1}</h3>
          {showDeleteButton && (
            <button onClick={() => handleDeleteQuestion(index)}>删除题目</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreateQuizPage;
