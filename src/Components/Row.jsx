import React, { useState } from 'react';
import Tabledata from './Tabledata';
import { fetchPostData, useFetchSubjects } from '../Client/Clinet.jsx'; 
import { useNavigate } from 'react-router-dom';

const Row = () => {
  const navigate = useNavigate();
  const subjects = useFetchSubjects();
  const [batch, setBatch] = useState('');
  const times = [
    '08:45-09:40', '09:40-10:35', '10:35-10:50', '10:50-11:45', 
    '11:45-12:40', '12:40-01:40', '01:40-02:35'
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => {
      acc[day] = Array(6).fill(''); 
      return acc;
    }, {})
  );

  const [error, setError] = useState(null); // State for error message

  const handleSelectionChange = (day, slotIndex, value) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].map((subject, index) => 
        index === slotIndex ? value : subject
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

 

    for (let day of days) {
      for (let slot of schedule[day]) {
        if (!slot) {
          setError(`Please fill all slots for ${day}.`);
          return;
        }
      }
    }

    if (!batch) {
      setError("Please select a batch.");
      return;
    }

    // Clear error and prepare payload if all slots and batch are selected
    setError(null);
    const payload = days.map(day => ({
      dayOfWeek: day,
      slot1: schedule[day]?.[0] || '',
      slot2: schedule[day]?.[1] || '',
      slot3: schedule[day]?.[2] || '',
      slot4: schedule[day]?.[3] || '',
      slot5: schedule[day]?.[4] || '',
      slot6: schedule[day]?.[5] || ''
    }));

    fetchPostData(`/add/timetable/${batch}`, payload)
      .then((data) => {
        console.log('Timetables added successfully:', data);
        if (window.confirm("Time Table Saved Successfully!!!")) {
          navigate('/admin');
        }
      })
      .catch((error) => console.error('Error adding timetables:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="timetable-form">
      <table className="timetable">
        <thead>
          <tr>
            <th>Day</th>
            {times.slice(0, 6).map((time) => ( 
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <Tabledata
              key={day}
              day={day}
              subjects={subjects}
              selectedSlots={schedule[day]}
              onSelectionChange={(slotIndex, value) => 
                handleSelectionChange(day, slotIndex, value)
              }
            />
          ))}
        </tbody>
      </table>
      {error && <p className="error-message">{error}</p>}
      <div className='box-5'>
        <select
          type="submit"
          className='input'
          id='input1'
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="" disabled>Select Batch</option>
          <option value='SOE'>School of Engineering</option>
          <option value='SOC'>School of Computing</option>
          <option value='IOD'>Institute of Design</option>
        </select>
        <button type="submit" className="submit-button">Save Timetable</button>
      </div>
    </form>
  );
};

export default Row;