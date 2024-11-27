import React, { useEffect } from 'react';
import LogCard from './LogCard';

const BASE_URL = "https://collegeapp-backend.onrender.com";

const Login1 = () => {

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
          console.log("Backend is running good");
        }
      } catch (error) {
        console.error('Could not reach backend:', error);
      }
    };

    // Send a ping request every 5 minutes (300000 ms)
    const interval = setInterval(() => {
      pingBackend();
    }, 120000); // 5 minutes

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
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