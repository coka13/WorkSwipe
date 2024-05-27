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

const LoginPage = () => {
  const [role, setRole] = useState("Job Seeker");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();//not used

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
      console.log(data);
      navigate("/home");
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
      <h4>Login</h4>
      <div className="loginBox">
        <CustomRadioButton
          onClick={handleRoleChange}
          title={"Choose role"}
          list={["Job Seeker", "Employer", "Admin"]}
        />

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
              type: "password",
              label: "Password",
              required: true,
              onChange: handleInputChange,
              value: formData.password,
            },
          ]}
        />
      </div>
      <BasicButtons text={"Submit"} onClick={handleSubmit} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <CustomLinkNavigate
        text={"Don't have an account yet?"}
        to={"/register"}
        label={"Sign Up"}
      />
      <Waves color={"#1976D2"} />
    </div>
  );
};

export default LoginPage;
