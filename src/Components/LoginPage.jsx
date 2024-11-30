import React, { useEffect, useState } from 'react';
import './component.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPostData } from '../Client/Clinet';

const LoginPage = () => {
  const [studentdata, setStudentdata] = useState({
    loginID: '12511413',
    password: '2165',
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error message

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'student'; // Default to 'student' if no role is passed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentdata.loginID || !studentdata.password) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true); // Set loading to true before making the request
    setError(null); // Reset error state before each login attempt

    fetchPostData(`/add/token/${role}`, studentdata) // Use role in URL
      .then((response) => {
        console.log(`${role} logged in:`, response.data);
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate(`/${role}`); // Redirect to role-specific dashboard
        } else {
          setError('Login failed. Invalid credentials.'); // Set error message
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError('Crediential failed. Please try again.'); // Set error message for other errors
      })
      .finally(() => {
        setLoading(false); // Reset loading to false after request is completed
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate(`/${role}`);
    }
  }, [navigate, role]);

  return (
    <div className="parent">
      <div className="L-page">
        <h6 className="p-text">Hey, Enter  your  details  for {role.charAt(0).toUpperCase() + role.slice(1)} Login</h6>

        <div className="input1">
          <p id="new">College ID</p>
          <input
            className="input"
            id="id"
            name="loginID"
            type="text"
            value={studentdata.loginID}
            onChange={handleChange}
          />
        </div>

        <div className="input1">
          <p id="new">Password</p>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            value={studentdata.password}
            onChange={handleChange}
          />
        </div>

        {/* Show the loading spinner if loading state is true */}
        {loading ? (
          <button className="input loading-spinner" id="login-btn1"  onClick={handleSubmit}>
          Loading....
         </button>
        ) : (
          <button className="input" id="login-btn1" onClick={handleSubmit}>
           Login
          </button>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;