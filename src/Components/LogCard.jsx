import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogCard = ({ id, text, role, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo, { state: { role } }); // Pass role via state
  };

  return (
    <div>
      <div className='container2' id ={id}onClick={handleClick}>
        {text}
      </div>
    </div>
  );
};

export default LogCard;