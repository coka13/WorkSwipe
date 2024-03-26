import React from "react";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import "./ProfilePage.css";

const ProfilePage = () => {
  const person = {
    username: "ShimonP",
    name: "shimon",
    url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/0384/production/_87700900_74846549.jpg",
    email: "Peres@gmail.com",
    experience: 5,
    technologies: ["c", "cpp"],
    linkedIn: "https://www.linkedin.com",
    location: "Haifa",
  };

  const personProfile = {
    Username: person.username,
    Name: person.name,
    Email: person.email,
    Experience: person.experience,
    Technologies: person.technologies,
    LinkedIn: person.linkedIn,
    Residence: person.location,
  };

  return (
    <div className="card">
      <DisplayCard
       db={personProfile}
       img={person.url}
      />
    </div>
  );
};

export default ProfilePage;
