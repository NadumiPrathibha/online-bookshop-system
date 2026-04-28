import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    // State variables for user input fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    // States for showing/hiding passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading and error handling states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // React Router navigation hook
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

 // Validate passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Send POST request to signup API
    try {
      const res = await axios.post('http://localhost:5000/api/user/signup', {
        username,
        email,
        password
      });

        // On success: notify, save email, redirect to login
      alert('✅ ' + (res.data?.message || 'User registered successfully'));
      localStorage.setItem('loggedInUserEmail', email);
      navigate('/Login');
    } catch (err) {

        // Display error from server or fallback message
      setErrorMessage(err.response?.data?.message || '❌ Registration failed');
    } finally {
      setLoading(false);// Stop loading spinner
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up to BookStore</h2>
        {errorMessage && <div className="signup-error">{errorMessage}</div>}

         {/* Signup Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          
             {/* Password input with visibility toggle */}
          <div className="signup-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup-input"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="signup-password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="signup-password-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="signup-input"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="signup-password-toggle"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="signup-switch">
          Already have an account?{' '}
          <span onClick={() => navigate('/Login')} className="signup-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
