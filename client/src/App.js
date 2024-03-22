import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import QuizPage from './QuizPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <QuizPage />
            ) : (
              <LoginPage setLoggedIn={setLoggedIn} />
            )}
          </Route>
          <Route path="/quiz" component={QuizPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
