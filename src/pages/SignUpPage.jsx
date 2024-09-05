import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  // State variables to store form input values and messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle user registration
  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Make POST request to register the user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, is_admin: role === 'admin' }),
      });

      if (response.ok) {
        // Display success message and redirect to login page
        setSuccessMessage('You have been successfully signed up! Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Display error message if registration fails
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // Handle any errors during the fetch request
      console.error('Error during sign-up:', error);
      setErrorMessage('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
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
        <div className="role-selection">
          <label htmlFor="role">Sign up as:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
