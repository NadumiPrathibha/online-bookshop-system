import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for toggling password visibility
import { useNavigate } from 'react-router-dom'; // Navigation hook
import './Login.css'; // External CSS for styling

function Login() {
  // State variables for form inputs and UI control
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Used for navigation after login

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true); // Show loading indicator on button

    try {
      // Send login data to backend
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse response

      if (response.ok) {
        // Store token and user data in localStorage or sessionStorage based on 'Remember Me'
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        storage.setItem('user', JSON.stringify(data.user));

        // Store logged-in user's email for accessing profile later
        localStorage.setItem('loggedInUserEmail', data.user.email);

        // Show success message and redirect to profile after delay
        setSuccessMessage('Login successful! Redirecting to your profile...');
        setTimeout(() => {
          navigate('/Profile'); // Navigate to profile page
        }, 2000);
      } else {
        // Handle login failure
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle network/server error
      setErrorMessage('Server error. Please try again later.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>

        {/* Show error or success message if exists */}
        {errorMessage && <div className="login-error">{errorMessage}</div>}
        {successMessage && <div className="login-success">{successMessage}</div>}

        {/* Login form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Email input field */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          {/* Password input with toggle visibility */}
          <div className="login-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            {/* Toggle password visibility */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="login-password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Remember Me checkbox */}
          <div className="login-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="remember"
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to signup page */}
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/Signup')} className="login-link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
