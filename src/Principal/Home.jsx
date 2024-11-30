import React from 'react';
import './Home.css';
import '../Components/component.css';
import Card from './Card';

const Home = () => {
  return (
    <div className='home'>
      <h1 className="Heading" id='id1'>ADMIN</h1>
      <div className="main">
        <div className="grid-container">
          <Card heading="ADD TEACHER" description="Add a teacher to the department or school" option="ADD" Nav="/add/teacher" />
          <Card heading="ADD STUDENT" description="Add new students to the School of Computing" option="ADD" Nav="/add/student" />
          <Card heading="ADD  SUBJECT" description="Add new subject to the all shchools" option="ADD" Nav="/add/subjects" />
          <Card heading="CREATE TIMETABLE" description="Add new students to the School of Computing" option="CREATE" Nav="/table" />
        </div>
        
      </div>
    </div>
  );
};

export default Home;