// LoginPage.js
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login validation here (e.g., check credentials)
    // For simplicity, assume login is successful if username and password are not empty
    if (username && password) {
      onLogin(); // Notify parent component that login is successful
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};

export default LoginPage;
