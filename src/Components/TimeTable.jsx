import React from 'react';
import Row from './Row';
import { useNavigate } from 'react-router-dom';

const TimeTable = () => {
  const navigate = useNavigate();

  return (
    <div className='table'> 
      <div className="flex">   
        <p id="btn">Create Timetable</p>
        <p id="btn"  onClick={() => navigate('/view/timetable')}>View Timetable</p>
      </div>
      <Row/>
    </div>
  );
};

export default TimeTable;