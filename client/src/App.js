// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import QuizPage from './QuizPage';
import CreateQuizPage from './CreateQuizPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <QuizPage />
            ) : (
              <LoginPage onLogin={() => setLoggedIn(true)} />
            )
          }
        />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
