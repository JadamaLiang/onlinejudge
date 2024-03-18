import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = `${username}:${password}`;
      const base64Credentials = btoa(credentials);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64Credentials}`,
        },
        credentials: 'include', // Send cookies for authentication
      });
      if (response.status === 404) {
        setMessage('用户名不存在或错误');
      } else if (response.status === 401) {
        setMessage('密码错误');
      } else if (response.status === 200) {
        setMessage('登录成功');
        // Handle success, e.g., set user state or redirect
      } else {
        setMessage('登录失败');
      }
    } catch (err) {
      setMessage('登录失败');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>欢迎来到OnlineJudge</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
