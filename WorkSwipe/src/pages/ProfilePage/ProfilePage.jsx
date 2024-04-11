import React from "react";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import "./ProfilePage.css";

const ProfilePage = () => {
 


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
