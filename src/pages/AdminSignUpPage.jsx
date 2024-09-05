import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const AdminSignUpPage = () => {
  // State variables for form inputs and error message
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle sign-up process
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Register new user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, is_admin: true }),
      });

      if (response.ok) {
        // Login user after successful registration
        const loginResponse = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (loginResponse.ok) {
          const { token, is_admin } = await loginResponse.json();
          dispatch(login({ role: is_admin ? 'admin' : 'user', token }));
          navigate('/dashboard');
        } else {
          const errorData = await loginResponse.json();
          setErrorMessage(errorData.message);
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Admin Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUpPage;
