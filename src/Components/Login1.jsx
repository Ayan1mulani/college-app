import React, { useEffect } from 'react';
import LogCard from './LogCard';
const BASE_URL = process.env.REACT_APP_BASE_URL


const Login1 = () => {

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch(
        {BASE_URL});
        if (response.ok) {
        alert('Backend is up and running.');
        } 
      } catch (error) {
        console.error('Could not reach backend:', error);
      }
    };

    pingBackend();
  }, []);
  return (
    <div className="main1">
      <div className="Pcontainer">
        <LogCard id="box2" text="Admin Login" role="admin" navigateTo="/admin" />
        <LogCard text="Teacher Login" role="teacher" navigateTo="/teacher" />
        <LogCard id="box3" text="Student Login" role="student" navigateTo="/LoginPage" />
      </div>
    </div>
  );
};

export default Login1;