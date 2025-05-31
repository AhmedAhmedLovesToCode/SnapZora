import React, { useState } from 'react';
import { loginUser } from '../api';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      setUser({ username: data.username });
    } catch (err) {
      setError(err.message);
    }

    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  };
  

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-msg">{error}</div>}
        <button id="loginBtn" type="submit" className="btn">Log in</button>
      </form>
    </div>
  );
}
