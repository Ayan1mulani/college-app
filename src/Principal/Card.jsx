import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css';
import '../Components/component.css';


const Card = (props) => {
  return (
    <div className='parent-Card'>
    <div className='card'>
    <h2 className='h-2'>{props.heading}</h2>
    <p>{props.School}</p>
    <div className='di-description'> <p className='d-admin'>{props.description}</p></div>
    <Link to={`${props.Nav}`} >
    < button className='input ' id='login-btn'>{props.option}</button>
    </Link>
    </div>
    </div>
  )
}

export default Card
