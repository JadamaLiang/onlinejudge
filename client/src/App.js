import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import QuizPage from './QuizPage';
//import LoginForm from './LoginPage';

function App() {
  <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/QuizPage" element={<QuizPage />} />
  </Routes>
};

export default App;
