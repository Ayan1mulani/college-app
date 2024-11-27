import React from 'react';
import {  useFetchSubjects } from '../Client/Clinet.jsx';

const Tabledata = ({ day, selectedSlots, onSelectionChange }) => {
  const subjects = useFetchSubjects();

  return (
    
    <tr>
      <td data-label="Day">{day}</td>
      {selectedSlots.map((subject, index) => (
        <td key={index} data-label={`Slot ${index + 1}`}>
          <select
            className="input"
            value={subject}
            onChange={(e) => onSelectionChange(index, e.target.value)}
          >
            
            <option value="">Choose Subject</option>
            {subjects.map(subject => (
      <option key={subject.id}>{subject.subjectName}</option>
      ))}
          
          </select>
        </td>
      ))}
    </tr>
  );
};

export default Tabledata;