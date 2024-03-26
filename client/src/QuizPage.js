// QuizPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import QuizQuestionType from './QuizQuestionType'; // Assuming QuizQuestionType component exists

const QuizPage = () => {
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [error, setError] = useState('');

  const fetchCreatedQuizzes = async () => {
    try {
      const response = await fetch('/api/quiz'); // Assuming this endpoint fetches the created quizzes
      if (!response.ok) {
        throw new Error('Failed to fetch created quizzes');
      }
      const data = await response.json();
      setCreatedQuizzes(data);
    } catch (error) {
      console.error('Error fetching created quizzes:', error);
      setError('Failed to fetch created quizzes');
    }
  };

  useEffect(() => {
    fetchCreatedQuizzes(); // Initial fetch of created quizzes on component mount
  }, []);

  return (
    <div>
      <h1>Quiz Page</h1>
      <Link to="/create-quiz">
        <button>Create Quiz</button>
      </Link>

      <h2>Created Quizzes</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {Array.isArray(createdQuizzes) &&
            createdQuizzes.map((quiz) => (
              <li key={quiz.id}>{quiz.title}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default QuizPage;
