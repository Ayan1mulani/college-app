import React from 'react'
import { Link  } from 'react-router-dom';
const Navbar = () => {




  return (
    <nav className='Header'>
        <div>
        <p>MIT ADT</p> 
        </div>
       <div  className="nav-links">
        <Link to={`/view/classmates`}><p>Students</p></Link>
        <Link to={`/view/timetable`}><p>TimeTable</p> </Link>
       <Link to={`/view/classmates`}>  <p>ClassRooms</p></Link>
      
       </div>
       <div  className='log'>
       <Link to={'/'}>
  <button 
    className='logout-btn'
    onClick={(e) => {
      if (!window.confirm("Are you sure you want to logout?")) {
        e.preventDefault();
        if(true){
          sessionStorage.clear('token')
        }
      }
    }}
  >Logout 
    <img src="../logout.png" alt="logout" height={25} width={30} /> 
  </button>
</Link>
       </div>
    </nav>
  )
}

export default Navbar
