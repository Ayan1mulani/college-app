import React, { useEffect, useState } from 'react';
import '../Principal/Home.css';
import '../Components/component.css';
import './student.css';
import StudentsCard from './StudentsCard';
import fetchGetData from '../Client/Clinet';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Classmates = () => {
  const [studentData, setStudentData] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [branch, setBranch] = useState('SOC');

  // Fetch students based on selected branch
  useEffect(() => {
    const getClassMates = async () => {
      console.log("Fetching students for branch:", branch);
      try {
        const response = await fetchGetData(`/view/students/${branch}`);
        console.log("Fetched students:", response.data);
        setStudentData(response.data);
        setFilterStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getClassMates();
  }, [branch]);

  // Filter students based on search text
  useEffect(() => {
    const filteredStudents = filterStudents.filter((student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setStudentData(filteredStudents);
  }, [searchText, filterStudents]);

  const handleBranchChange = (event, newBranch) => {
    if (newBranch != null) {
      console.log("Branch changed to:", newBranch);
      setBranch(newBranch);
    }
  };

  return (
    <div className="classmates-container">
      <div className="students">
        {/* ToggleButtonGroup for branch selection */}
        <div className='tog-btn'>
          <ToggleButtonGroup
            color="primary"
            value={branch}
            exclusive
            onChange={handleBranchChange}
            aria-label="Platform"
            
            className="branch-toggle-group"
          >
            <ToggleButton value="SOE" className="toggle-btn">SOE</ToggleButton>
            <ToggleButton value="SOC" className="toggle-btn">SOC</ToggleButton>
            <ToggleButton value="IOD" className="toggle-btn">IOD</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            className="search-box input"
            placeholder="Search Student"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <p className="style1" id="styleid1">{studentData.length} Students</p>
        </div>

        {/* Student Data Display */}
        <div className="messages-container">
          {studentData.length > 0 ? (
            <StudentsCard Data={studentData} />
          ) : (
            <p style={{ justifySelf: 'center', marginTop: '100px' }}>
              No students available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classmates;