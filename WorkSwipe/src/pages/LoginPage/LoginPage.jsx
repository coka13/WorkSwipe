import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import { useDispatch } from "react-redux";
import CustomRadioButton from "../../components/CustomRadioButton/CustomRadioButton";
import { useMutation } from "@tanstack/react-query";
import {
  adminRoute,
  baseUrl,
  employerRoute,
  jobSeekerRoute,
} from "../../utils/routes";
import "./LoginPage.css";
import { setAuthentication, setUserId, setUserRole } from "../../store/slices/authSlice";
import { setJobSeekerGeneralDetail } from "../../store/slices/jobSeekerSlice";
import { setEmployerGeneralDetail } from "../../store/slices/employerSlice";
import { setAdminGeneralDetail } from "../../store/slices/adminSlice";

const LoginPage = () => {
  const [role, setRole] = useState("Job Seeker");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setUrlByRole = () => {
    if (role === "Job Seeker") {
      return `${baseUrl}${jobSeekerRoute}/jobSeekerLogin`;
    } else if (role === "Employer") {
      return `${baseUrl}${employerRoute}/employerLogin`;
    } else {
      return `${baseUrl}${adminRoute}/adminLogin`;
    }
  };

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch(setUrlByRole(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const jsonData = await response.json();
      return jsonData;
    },
    onSuccess: (data) => {
   
      if(data.message===undefined){
       
      dispatch((setUserRole(role)))
      dispatch(setAuthentication(true))
      dispatch(setUserId(data._id))
      dispatch(setJobSeekerGeneralDetail(data))
      dispatch(setEmployerGeneralDetail(data))
      dispatch(setAdminGeneralDetail(data))
      navigate("/home");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginHeader">
          <h2 className="loginTitle">Welcome Back</h2>
          <p className="loginSubtitle">Sign in to your WorkSwipe account</p>
        </div>
        
        <div className="loginCard">
          <div className="roleSection">
            <h3 className="sectionTitle">Select Your Role</h3>
            <CustomRadioButton
              onClick={handleRoleChange}
              title={""}
              list={["Job Seeker", "Employer", "Admin"]}
            />
          </div>

          <div className="formSection">
            <h3 className="sectionTitle">Credentials</h3>
            <FormComponent
              props={[
                {
                  name: "username",
                  type: "text",
                  label: "Username",
                  required: true,
                  onChange: handleInputChange,
                  value: formData.username,
                },
                {
                  name: "password",
                  formType: "password",
                  type: "password",
                  label: "Password",
                  required: true,
                  onChange: handleInputChange,
                  value: formData.password,
                },
              ]}
            />
          </div>

          {isLoading && <div className="loadingMessage">Signing you in...</div>}
          {error && <div className="errorMessage">Login failed. Please check your credentials.</div>}

          <div className="submitSection">
            <BasicButtons text={"Sign In"} onClick={handleSubmit} />
            <CustomLinkNavigate
              text={"Don't have an account yet?"}
              to={"/register"}
              label={"Create Account"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
