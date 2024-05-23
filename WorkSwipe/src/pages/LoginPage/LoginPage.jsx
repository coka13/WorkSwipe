import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";

import { useDispatch } from "react-redux";
import "./LoginPage.css";
import { setEmployerOffers } from "../../store/slices/employerOffersSlice";
import CustomRadioButton from "../../components/CustomRadioButton/CustomRadioButton";


const LoginPage = () => {
  const [role, setRole]= useState("Job Seeker")
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick= (e)=>{setRole(e.target.value)}

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if(role==="Job Seeker"){
      const { data, error, isLoading } = useQuery({
        queryKey: ["get-technlogies-by-ids"], // key
        queryFn: async () => {
          const response = await fetch(
            baseUrl + technologyRoute + "/technologiesByIDs",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ idsList: userTechnologies }),
            }
          );
          const jsonData = await response.json();
          console.log(jsonData)
          return jsonData;
        },
  
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (

    <>
      <div className="loginPage">
        <h4>Login</h4>
        <div className="loginBox">
          <CustomRadioButton onClick={onClick} title={"Choose role"} list={["Job seeker" , "Employer" , "Admin"]}/>
          <FormComponent
            props={[
              {
                name: "username",
                type: "other",
                label: "Username",
                required: true,
                onChange: handleInputChange,
                value: formData.username,
              },
              {
                name: "password",
                type: "other",
                label: "Password",
                required: true,
                onChange: handleInputChange,
                value: formData.password,
              },
            ]}
          />
        </div>
        <BasicButtons text={"Submit"} onClick={handleSubmit} />
        <CustomLinkNavigate
          text={"Don't have an account yet?"}
          to={"/register"}
          label={"Sign Up"}
        />
        <Waves color={"#1976D2"} />
      </div>
    </>
  );

};

export default LoginPage;
