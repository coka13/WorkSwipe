import React from "react";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import "./ProfilePage.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {


  const personProfile = {
    Username: useSelector((state)=>state.users.username),
    Name: useSelector((state)=>state.users.name),
    Email: useSelector((state)=>state.users.email),
    Experience: useSelector((state)=>state.users.experience),
    Technologies: useSelector((state)=>state.users.technologies),
    LinkedIn: useSelector((state)=>state.users.linkedIn),
    Residence: useSelector((state)=>state.users.location),
  };

  const img = useSelector((state)=>state.users.url)

  return (
    <div className="card">
      <DisplayCard
       db={personProfile}
       img={img}
      />
    </div>
  );
};

export default ProfilePage;
