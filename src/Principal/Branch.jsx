import React from 'react'
import './Home.css';
import '../Components/component.css';
import Card from './Card';

// selecting the Teachers of the branch
const Soe = () => {

  return (
      <div >
        <h1 className="Heading">ADMIN Dashboard</h1>
    <div className='grid-container'>
    <Card heading="SOE TEACHERS" description="Hod: Akshay Dhumale " option="view" Nav="/teachers/SOE" />
        <Card heading="SOC TEACHERS" description="Hod: Shweta " option="view"  Nav="/teachers/SOC"/>
        <Card heading="IOD TEACHERS" description="Hod: Mr. Fernandis " option="view" Nav="/teachers/IOD"/>
      </div>
    </div>
  )
}

export default Soe
