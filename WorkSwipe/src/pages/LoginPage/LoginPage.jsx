import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import { useDispatch } from "react-redux";
import { setGeneralDetail } from "../../store/slices/userSlice";
import { getUserRole } from "../../utils/getUserRole";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dummyUsers = [
    {
      username: "adminUser",
      name: "Admin User",
      isEmployer: false,
      isAdmin: true,
      email: "adminuser@example.com",
    },
    {
      username: "jobSeeker1",
      name: "Job Seeker One",
      technologies: ["JavaScript", "React", "Node.js"],
      isEmployer: false,
      isAdmin: false,
      linkedIn: "https://linkedin.com/in/jobseeker1",
      experience: 2,
      residence: "San Francisco, USA",
      url: "https://jobseeker1.com",
      email: "jobseeker1@example.com",
    },
    {
      username: "employer1",
      name: "Employer One",
      isEmployer: true,
      isAdmin: false,
      linkedIn: "https://linkedin.com/in/employer1",
      residence: "Austin, USA",
      url: "https://employer1.com",
      email: "employer1@example.com",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const user = dummyUsers.find(
      (user) =>
        user.username === formData.username && formData.password === "password" // Assuming password is always "password" for dummy users
    );
    if (user) {
      dispatch(setGeneralDetail(user))
      console.log(getUserRole(user))
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
          <FormComponent
            props={[
              {
                name: "username",
                type: "login",
                label: "Username",
                required: true,
                onChange: handleInputChange,
                value: formData.username,
              },
              {
                name: "password",
                type: "login",
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
