import React, { useState } from 'react';
import '../Components/component.css';
import './Home.css';
import { fetchPostData } from '../Client/Clinet';

const AddSubject = () => {
  const [subject, setSubject] = useState({
    subjectName: '',
  });
  const [loading, setLoading] = useState(false); // New state to track loading

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty input
    if (!subject.subjectName.trim()) {
      alert('Please enter a subject name.');
      return;
    }

    setLoading(true); // Start loading

    fetchPostData('/add/subjects', subject)
      .then((response) => {
        alert('Subject added successfully!');
        console.log('Subject added:', response);

        // Reset the form after successful submission
        setSubject({
          subjectName: '',
        });
        setLoading(false); // Stop loading after submission
      })
      .catch((error) => {
        console.error('Error adding subject:', error);
        alert('Failed to add subject. Please try again.');
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <div>
      <div className='parent'>
        <div className='L-page'>
          <p className='p-text Heading'>SUBJECT NAME</p>
          <input
            className='input'
            type='text'
            name='subjectName'
            placeholder='Subject Name'
            value={subject.subjectName}
            onChange={handleInputChange}
          />
          <button className='btn' id='login-btn' onClick={handleSubmit}>
            {loading ? 'Adding...' : 'ADD'} {/* Change button text to "Adding..." while loading */}
          </button>
        </div>
      </div>

      {/* Optionally, display a loading spinner */}
      {loading && (
        <div className="loading-spinner">
          <p>Loading...</p> {/* You can replace this with a spinner component */}
        </div>
      )}
    </div>
  );
};

export default AddSubject;