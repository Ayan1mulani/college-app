import React, { useState } from 'react';
import '../Components/component.css';
import './Home.css';
import { fetchPostData } from '../Client/Clinet';

const AddS = () => {
  const [student, setStudent] = useState({
    loginID: '',
    studentName: '',
    password: '',
    batch: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!student.studentName || !student.loginID || !student.password || !student.batch) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    fetchPostData(`/add/student/${student.batch}`, student)
      .then((response) => {
        alert('Student details added successfully!');
        console.log('Student added:', response);

        // Reset the form after successful submission
        setStudent({
          loginID: '',
          studentName: '',
          password: '',
          batch: '',
        });
      })
      .catch((error) => {
        console.error('Error adding student:', error);
        alert('Failed to add student. Please try again.');
      });
  };

  return (
    <div className='parent'>
      <div className='L-page add-card'>
        <p className='p-text Heading'>Add Student Details</p>

        <input
          className='input'
          type='text'
          name='studentName'
          placeholder='Student Name'
          value={student.studentName}
          onChange={handleInputChange}
        />

        <input
          className='input'
          type='text'
          name='loginID'
          placeholder='Login ID'
          value={student.loginID}
          onChange={handleInputChange}
        />

        <input
          className='input'
          type='text'
          name='password'
          placeholder='Roll No'
          value={student.password}
          onChange={handleInputChange}
        />

        <select
          className='input'
          name='batch'
          value={student.batch}
          onChange={handleInputChange}
        >
          <option value='' disabled>
            Choose Batch
          </option>
          <option value='SOC'>SOC</option>
          <option value='SOE'>SOE</option>
          <option value='IOD'>IOD</option>
        </select>

        <button className='btn' id='login-btn' onClick={handleSubmit}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddS;