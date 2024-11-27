import React, { useState } from 'react';
import '../Components/component.css';
import { fetchPostData, useFetchSubjects } from '../Client/Clinet';

const AddT = () => {
  const [teacher, setTeacher] = useState({
    details: '',
    college: '',
    teacherName: '',
    password: '',
    loginId: '',
    teacherContact: '',
    subject: '',
  });

  const subjects = useFetchSubjects();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !teacher.details ||
      !teacher.college ||
      !teacher.teacherName ||
      !teacher.loginId ||
      !teacher.teacherContact ||
      !teacher.subject
    ) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    fetchPostData(`/add/teacher/${teacher.college}`, teacher)
      .then((response) => {
        alert('Teacher details added successfully!');
        console.log('Teacher added:', response);

        // Reset the form after successful submission
        setTeacher({
          details: '',
          college: '',
          teacherName: '',
          password: '',
          loginId: '',
          teacherContact: '',
          subject: '',
        });
      })
      .catch((error) => {
        console.error('Error adding teacher:', error);
        alert('Failed to add teacher. Please try again.');
      });
  };

  return (
    <div className='parent'>
      <div className='L-page'>
        <p className='p-text Heading'>Add Teacher's Details</p>

        <input
          className='input'
          type='text'
          name='teacherName'
          placeholder='Name'
          value={teacher.teacherName}
          onChange={handleInputChange}
        />

        <input
          className='input'
          type='text'
          name='loginId'
          placeholder='LoginID'
          value={teacher.loginId}
          onChange={handleInputChange}
        />

        <input
          className='input'
          type='text'
          name='details'
          placeholder='Qualification'
          value={teacher.details}
          onChange={handleInputChange}
        />

        <input
          className='input'
          type='tel'
          name='teacherContact'
          placeholder='Contact'
          value={teacher.teacherContact}
          onChange={handleInputChange}
        />

        <select
          className='input'
          name='college'
          value={teacher.college}
          onChange={handleInputChange}
        >
          <option disabled value=''>
            Choose Institute
          </option>
          <option value='SOE'>School of Engineering</option>
          <option value='SOC'>School of Computing</option>
          <option value='IOD'>Institute of Design</option>
        </select>

        <select
          className='input'
          name='subject'
          value={teacher.subject}
          onChange={handleInputChange}
        >
          <option disabled value=''>
            Choose Subject
          </option>
          {subjects.map((subject) => (
            <option key={subject.subjectid} value={subject.subjectName}>
              {subject.subjectName}
            </option>
          ))}
        </select>

        <button className='btn' id='login-btn' onClick={handleSubmit}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddT;