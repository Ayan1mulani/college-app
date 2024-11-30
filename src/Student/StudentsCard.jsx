import React from 'react';
const StudentsCard = (props) => {
  const { Data } = props;

  return (

    <div className='student-card'>
    <hr className="line"    />
    <table className='classmates-table'>
    <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>

          <tbody>
            
            {Data.map((student, index) => (
              <tr key={index} className="student-row">
                <td className="name-cell style1">{student.name}</td>
                <td className="login-id-cell ">{student.loginID}</td>
              </tr>
            ))}
          </tbody>
          </table>
    </div>
  );
};

export default StudentsCard;