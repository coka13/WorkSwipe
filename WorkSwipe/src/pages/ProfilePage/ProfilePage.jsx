import React from 'react'
import DisplayCard from '../../components/DisplayCard/DisplayCard'
import "./ProfilePage.css"

const ProfilePage = () => {
  const person = 
    {
      username:"ShimonP",
      name: "shimon",
      url:"https://ichef.bbci.co.uk/news/976/cpsprodpb/0384/production/_87700900_74846549.jpg",
      email: "Peres@gmail.com",
      experience: 5,
      technologies: ["c", "cpp"],
      linkedIn: "https://www.linkedin.com",
      exp: 5,
      location: "Haifa",
    }

  return (
    <div className='card'>

      <DisplayCard db={person}/>

    </div>
  )
}

export default ProfilePage