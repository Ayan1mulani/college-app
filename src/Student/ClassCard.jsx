import React from 'react'
import './student.css'

const ClassCard = (props) => {
  return (
    
    <div className='box1' > 
        <div className='box2' style={{ backgroundImage: `url(${props.backgroundImage})` }}>
         <h2>{props.subjectName}</h2>
         <p>{props.subjectTeacher}</p>
    </div>
    </div>
  )
}

export default ClassCard
