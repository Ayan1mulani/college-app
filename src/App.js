import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';

const App = () => {
  const location = useLocation();

  // Define paths where Navbar should not be rendered
  const hideNavbarRoutes = ["/", "/LoginPage","/view/timetable","/table","/student"];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;