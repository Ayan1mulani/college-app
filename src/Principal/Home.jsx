import React from 'react';
import './Home.css';
import '../Components/component.css';
import Card from './Card';

const Home = () => {
  return (
    <div>
      <h1 className="Heading" id='id1'>ADMIN</h1>
      <div className="main">
        <div className="grid-container">
          {/* <Card heading="VIEW ALL Teachers" description="View the teachers of all departments & schools" option="View" Nav="/view/teachers" /> */}
          <Card heading="ADD Teacher" description="Add a teacher to the department or school" option="Add" Nav="/add/teacher" />
          <Card heading="ADD NEW STUDENT" description="Add new students to the School of Computing" option="Add" Nav="/add/student" />
          <Card heading="ADD NEW SUBJECT" description="Add new subject to the all shchools" option="Add" Nav="/add/subjects" />
          <Card heading="CREATE TIMETABLE" description="Add new students to the School of Computing" option="Create" Nav="/table" />
        </div>
        
      </div>
    </div>
  );
};

export default Home;