import React, { useEffect, useState } from 'react';
import fetchGetData from '../Client/Clinet';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ViewTimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [branch, setBranch] = useState('SOC'); // Initial branch selection
  const times = [
    '08:45-09:40', '09:40-10:35', '10:35-10:50', '10:50-11:45', 
    '11:45-12:40', '12:40-01:40', '01:40-02:35'
  ];

  useEffect(() => {
    const getTimetable = async () => {
      if (!branch) return; // Fetch only if branch is selected
      try {
          const response = await fetchGetData(`/view/timetable/${branch}`);
          setTimetableData(response.data);
      } catch (error) {
          console.error(error);
      }
    };
    getTimetable();
  }, [branch]); // Re-fetch whenever branch changes

  // Handler for branch selection
  const handleBranchChange = (event, newBranch) => {
    if (newBranch !== null) {
      setBranch(newBranch);
    }
  };

  return (
    <div className="view-timetable-container">
      <h1 className="header">Weekly Timetable</h1>
        <ToggleButtonGroup
        color="primary"
        value={branch}
        exclusive
        onChange={handleBranchChange}
        aria-label="branch selection"
        className="branch-toggle-group"
      >
        <ToggleButton value="SOE">SOE</ToggleButton>
        <ToggleButton value="SOC">SOC</ToggleButton>
        <ToggleButton value="IOD">IOD</ToggleButton>
      </ToggleButtonGroup>

      {/* Timetable display */}
      <form>
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
            {timetableData.map((dayData) => (
              <tr key={dayData.dayOfWeek}>
                <td className='day1'>{dayData.dayOfWeek}</td>
                <td>{dayData.slot1 || '-'}</td>
                <td>{dayData.slot2 || '-'}</td>
                <td>{dayData.slot3 || '-'}</td>
                <td>{dayData.slot4 || '-'}</td>
                <td>{dayData.slot5 || '-'}</td>
                <td>{dayData.slot6 || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ViewTimeTable;