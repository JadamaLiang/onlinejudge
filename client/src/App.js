// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import QuizPage from './QuizPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <QuizPage /> : <LoginPage onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
