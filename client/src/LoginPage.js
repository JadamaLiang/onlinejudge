import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = `${username}:${password}`;
      const base64Credentials = btoa(credentials);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64Credentials}`,
        },
        credentials: 'include', // Send cookies for authentication
      });
      
      if (response.status === 404) {
        setError('用户名不存在或错误');
      } else if (response.status === 401) {
        setError('密码错误');
      } else if (response.status === 200) {
        onLogin(); // Notify parent component that login is successful
      } else {
        setError('登录失败');
      }
    } catch (err) {
      setError('登录失败');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>欢迎到OnlineJudge</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="用户名"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
      />
      <button onClick={handleLogin}>登录</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
