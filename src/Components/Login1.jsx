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
    }, 120000); 

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main1">
      <div className="Pcontainer">
        <img className='img' src="../1.png" alt="logout button"   />
        <div className='cards1'>
         <div>
          <h2 className='h-3'>Welcome to School Management System</h2>   
          <p className='desc-l'>Streamline school management, class organization, and add students and faculty. <br />
            Seamlessly track attendance, assess performance, and provide feedback. Access records, view marks, and communicate effortlessly.</p>
          </div>
          <div className='card-div'>
        <LogCard id="box2"  text="Admin Login" role="admin" navigateTo="/admin" />
        <LogCard id="box3" text="Teacher Login" role="teacher" navigateTo="/teacher" />
        <LogCard id="box4" text="Student Login" role="student" navigateTo="/LoginPage" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;