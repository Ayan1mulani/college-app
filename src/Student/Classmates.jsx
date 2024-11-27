import React, { useEffect, useState } from 'react';
import '../Principal/Home.css';
import '../Components/component.css';
import './student.css';
import StudentsCard from './StudentsCard';
import fetchGetData from '../Client/Clinet';

const Classmates = () => {
  const [Studentdata, setStudentdata] = useState([]);
  const [filterstudents, setFilterstudents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getClassMates = async () => {
      try {
        const response = await fetchGetData(`/view/students/SOC`);
        setStudentdata(response.data);
        setFilterstudents(response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    getClassMates();
  }, []);

  useEffect(() => {
    const filteredStudents = filterstudents.filter((student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setStudentdata(filteredStudents);
  }, [searchText, filterstudents]);

  return (
    <div className="classmates-container">
      <div className="students">
        
        <div className="search-container">
          <input
            className="search-box input"
            placeholder="Search Student"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          
        <p className='style1'>{Studentdata.length} Students</p>

        </div>



        <div className="messages-container">
          {Studentdata.length > 0 ? (
            <StudentsCard Data={Studentdata} />
          ) : (
            <p style={{justifySelf:'center', marginTop:'100px'}}>No students available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classmates;