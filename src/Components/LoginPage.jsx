import React, { useEffect, useState } from 'react';
import './component.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPostData } from '../Client/Clinet';

const LoginPage = () => {
  const [studentdata, setStudentdata] = useState({
    loginID: '',
    password: '',
  });

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

    fetchPostData(`/add/token/${role}`, studentdata) // Use role in URL
      .then((response) => {
        console.log(`${role} logged in:`, response.data);
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate(`/${role}`); // Redirect to role-specific dashboard
        } else {
          alert('Login failed. Invalid credentials.');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
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
        <p className="p-text">Hey, Enter your details for {role.charAt(0).toUpperCase() + role.slice(1)} Login</p>

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

        <button className="input" id="login-btn1" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;