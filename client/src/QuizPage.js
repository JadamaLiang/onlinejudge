import React, { useState } from 'react';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState('');

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    setQuizzes([...quizzes, { title: newQuizTitle }]);
    setNewQuizTitle('');
  };

  return (
    <div>
      <h1>Quiz Page</h1>
      <form onSubmit={handleCreateQuiz}>
        <div>
          <label htmlFor="newQuiz">New Quiz Title:</label>
          <input
            type="text"
            id="newQuiz"
            value={newQuizTitle}
            onChange={(e) => setNewQuizTitle(e.target.value)}
          />
          <button type="submit">Add Quiz</button>
        </div>
      </form>
      <h2>Your Quizzes:</h2>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizPage;
