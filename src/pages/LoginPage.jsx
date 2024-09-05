import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const LoginPage = () => {
  // State hooks for email, password, and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Hooks for navigation and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle login process
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.is_admin ? 'admin' : 'user');
        dispatch(login({ role: data.is_admin ? 'admin' : 'user', token: data.token }));
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate(data.is_admin ? '/admin/meals' : '/customer/menu');
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
