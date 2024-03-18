import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 404) {
        setMessage('用户名不存在或错误');
      } else if (response.status === 401) {
        setMessage('密码错误');
      } else if (response.status === 200) {
        setMessage('登录成功');

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
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">登录</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
