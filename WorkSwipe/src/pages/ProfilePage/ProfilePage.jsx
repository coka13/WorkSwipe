import React, { useEffect, useState } from "react";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTech, updateUserField } from "../../store/slices/userSlice";
import FormComponent from "../../components/FormComponent/FormComponent";
import {  techList } from "../../dummyData/constants";


const ProfilePage = () => {
  const person = useSelector((state) => state.users);
  console.log(person)
  const dispatch = useDispatch();

  const personProfile = {
    Username: person.username,
    Name: person.name,
    Email: person.email,
    Experience: person.experience,
    LinkedIn: person.linkedIn,
    Residence: person.residence,
    Technologies: person.technologies,
  };

  const img = person.url;





  const handleEdit = (field, value) => {
    console.log("field "+field,"value "+value)
    dispatch(updateUserField({field, value }));
  };

  const handleDeleteTech = (tech) => {
    dispatch(deleteTech(tech));
  };



  return (
    <div className="card">
      <DisplayCard db={personProfile} img={img} handleEdit={handleEdit} handleDeleteList={handleDeleteTech} checkedList={person.technologies}  />
    </div>
  );
};

export default ProfilePage;
