import React from 'react'
import Card from '../Principal/Card'

const Teacher = () => {
  return (
    <div>
    <h1 className="Heading" id='id1'>Teacher DashBoard</h1>
    <div className="main">
      <div className="grid-container">
        <Card heading="VIEW YOUR STUDENT" description="View the Students of your class" option="View" Nav="/view/classmates" />
        <Card heading="MARK ATTENDANCE" description="Mark the attendance of the student" option="Mark" Nav="/attendance" />
        <Card heading="Send Messages" description="Send a text note to the students" option="Send" Nav="/messages" />
      </div>
      
    </div>
  </div>
  )
}


export default Teacher











