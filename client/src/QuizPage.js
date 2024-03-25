// QuizPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  return (
    <div>
      <h2>Quiz Page</h2>
      {/* Add a button or link to navigate to the CreateQuizPage */}
      <Link to="/create-quiz">Create New Quiz</Link>
      {/* You can also use a button with onClick event */}
      {/* <button onClick={() => history.push('/create-quiz')}>Create New Quiz</button> */}
    </div>
  );
};

export default QuizPage;
