// QuizPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import QuizQuestionType from './QuizQuestionType'; // Assuming QuizQuestionType component exists

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quiz');
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      } else {
        console.error('收取试卷失败');
      }
    } catch (error) {
      console.error('收取试卷失败:', error);
    }
  };

  return (
    <div>
      <h1>试卷</h1>
      <Link to="/create-quiz">
        <button>创建试卷</button>
      </Link>

      <h2>已有试卷</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizPage;
