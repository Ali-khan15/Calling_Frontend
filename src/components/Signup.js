import React, { useState } from 'react';
import './Signup.css'; // Importing the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    companyName: ''
  });
  const navigate = useNavigate(); // React Router's navigation hook

  // Function to toggle between forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: '', 
      phone: '',
      email: '',
      password: '',
      companyName: ''
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
  
    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post('https://calling-backend-mu.vercel.app/login', {
          email: formData.email,
          password: formData.password
        });
  
        if (response.status === 200) {
          alert('Login successful!');
          const token = response.data.token; // Get the token from response
          localStorage.setItem('token', `Bearer ${token}`); // Store the token in localStorage
          navigate('/home'); // Navigate to home page on success
        }
      } else {
        // Signup API call
        const response = await axios.post('https://calling-backend-mu.vercel.app/signup', {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName
        });
  
        if (response.status === 201) {
          alert(response.data.message); // Show success message, which includes the email sent message
          const token = response.data.token; // Get the token from response
          localStorage.setItem('token', `Bearer ${token}`); // Store the token in localStorage
          navigate('/home'); // Navigate to home page on success
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Display the error message sent by the backend
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  
  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Join Us and Unlock Endless Possibilities!</h1>
        <p>
          Welcome to Creativo, where your journey begins. {isLogin ? 'Log in to continue your journey' : 'Sign up now to access exclusive features, personalized recommendations, and seamless user experience.'}
        </p>
      </div>

      <div className={isLogin ? 'login-right' : 'signup-right'}>
        {isLogin ? (
          <>
            <h2>Log in to Calling Web</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="btn-primary">Log in</button>

              <div className="social-signup">
                <p>or</p>
                <button type="button" className="btn-google">Log in with Google</button>
              </div>
            </form>

            <p className="signup-redirect">
              Don't have an account? <a href="#signup" onClick={toggleForm}>Sign up</a>
            </p>
          </>
        ) : (
          <>
            <h2>Sign up to Calling Web</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                pattern="[0-9]{11}"
                title="Please enter a valid 10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Create a Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="btn-primary">Create Account</button>

              <div className="social-signup">
                <p>or</p>
                <button type="button" className="btn-google">Sign up with Google</button>
              </div>
            </form>

            <p className="login-redirect">
              Already a member? <a href="#login" onClick={toggleForm}>Log in here</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
