import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'

export default function Home() {
    return (
    <div className='Home container'>
      <div className="Home-text">
        <h1>We ensure better education for better future</h1>
        <p>
            Our cutting-edge curriculum is designed to empower students with the knowledge, skills, and experiences needed to excel in the dynamic field of education
        </p>
        {/* <button className='btn'>Explore more <img src={dark_arrow} alt="" /></button> */}
      </div>
    </div>
  )
}

