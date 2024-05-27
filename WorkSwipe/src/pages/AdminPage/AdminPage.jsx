import React, { useState } from "react";
import CustomList from "../../components/CustomList/CustomList";
import { useDispatch, useSelector } from "react-redux";
import { addSystemTechnology, deleteSystemTechnology } from "../../store/slices/techSlice";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import "./AdminPage.css"

const AdminPage = () => {
  const dispatch = useDispatch();
  const systemTechs = useSelector((state) => state.technologies.technologies); //brings tech data from store for editing techlist
  const [newTech, setNewTech] = useState("");
  const handleInputChange = (e) => {
    setNewTech( e.target.value);
  
  };

  const handleSubmit = () => {
    if(newTech!=="" && (!systemTechs.includes(newTech))){
    dispatch(addSystemTechnology(newTech))//send new tech to techlist
    }
  };

  const dispatchFunc = (tech) => {
    dispatch(deleteSystemTechnology(tech))//del....
  }
  return (
      <>
    <div className="title">
      <h4>Admin Panel</h4>
    </div>
    <div className="list">
      <h3>Technologies in the system</h3>
    <CustomList items={systemTechs} dispatchFunc={dispatchFunc} />
    <h3>Add new technlogy to the system</h3>
    <FormComponent props={[
      {
        name: "Add new technology",
        type: "other",
        label: "Add new technology",
        required: false,
        onChange: handleInputChange,
        value: newTech,
    }]}
    />
    <BasicButtons text={"Add new technology"} onClick={handleSubmit}/>
    </div>
 
    </>
  );
};

export default AdminPage;
