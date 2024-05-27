import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import Waves from "../../components/Waves/Waves";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import ScienceIcon from "@mui/icons-material/Science";
import CustomRadioButton from "../../components/CustomRadioButton/CustomRadioButton";
import { setRegisterForm } from "../../store/slices/registerSlice";
import { setAdminGeneralDetail } from "../../store/slices/adminSlice";
import { setJobSeekerGeneralDetail } from "../../store/slices/jobSeekerSlice";
import { setEmployerGeneralDetail } from "../../store/slices/employerSlice";
import { setAuthentication } from "../../store/slices/authSlice";
import { setSystemTechnologies } from "../../store/slices/techSlice";
import {
  adminRoute,
  baseUrl,
  employerRoute,
  jobSeekerRoute,
  technologyRoute,
} from "../../utils/routes";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [role, setRole] = useState("Job Seeker");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const registerForm = useSelector((state) => state.register.registerForm);//extract registerForm from 

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const setUrlByRole = () => {
    if (role === "Job Seeker") {
      return `${baseUrl}${jobSeekerRoute}/createJobSeeker`;
    } else if (role === "Employer") {
      return `${baseUrl}${employerRoute}/createEmployer`;
    } else {
      return `${baseUrl}${adminRoute}/createAdmin`;
    }
  };

  const setFormDataByRole = (formData) => {
    console.log("formData",formData)
    if (role === "Job Seeker") {
      return {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        experience: formData.experience,
        location: formData.location,
        email: formData.email,
        technologies: formData.technologies,
        linkedInUrl: formData.linkedInUrl,
        gitHubUrl: formData.gitHubUrl,
      };
    } else if (role === "Employer") {
      return {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        email: formData.email,
        linkedInUrl: formData.linkedInUrl,
      };
    } else {
      return {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        email: formData.email,
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(setFormDataByRole(registerForm));

  };

  const { isLoading: techIsLoading, error: techError, data: techData } = useQuery({
    queryKey: ["get-all-technologies"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}${technologyRoute}/allTechnologies`);
      const jsonData = await response.json();
      dispatch(setSystemTechnologies(jsonData));
      return jsonData;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(setUrlByRole(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      return jsonData;
    },
    onSuccess: (data) => {
      console.log(data);
      if (role === "Job Seeker") {
        dispatch(setJobSeekerGeneralDetail(data));//getting users details from store
      } else if (role === "Employer") {
        dispatch(setEmployerGeneralDetail(data));
      } else if (role === "Admin") {
        dispatch(setAdminGeneralDetail(data));
      }
      dispatch(setAuthentication(true));
      navigate("/home");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  if (techIsLoading) {
    return <div>Loading...</div>;
  }

  if (techError) {
    return <div>Error: {techError.message}</div>;
  }

  return (
    <div className="registerPage">
      <h4>Register</h4>
      <div className="registerBox">
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
        formType: "username",
        label: "Username",
        required: true,
        form: registerForm,
        dispatchFunc: setRegisterForm,
      },
      {
        name: "password",
        formType:"password",
        type: "password",
        label: "Password",
        required: true,
        form: registerForm,
        dispatchFunc: setRegisterForm,
      },
      {
        name: "email",
        formType:"email",
        type: "email",
        label: "Email",
        required: true,
        form: registerForm,
        dispatchFunc: setRegisterForm,
      },
      {
        name: "name",
        type: "text",
        label: "Name",
        required: true,
        form: registerForm,
        dispatchFunc: setRegisterForm,
      },
    ]}
  />
  {role === "Job Seeker" && (
    <FormComponent
      props={[
        {
          name: "image",
          type: "text",
          label: "Image link",
          required: false,
          form: registerForm,
          dispatchFunc: setRegisterForm,
        },
        {
          name: "linkedInUrl",
          type: "text",
          label: "LinkedIn link",
          required: false,
          form: registerForm,
          dispatchFunc: setRegisterForm,
        },
        {
          name: "gitHubUrl",
          type: "text",
          label: "GitHub link",
          required: false,
          form: registerForm,
          dispatchFunc: setRegisterForm,
        },
        {
          name: "location",
          type: "text",
          label: "Residence",
          required: false,
          form: registerForm,
          dispatchFunc: setRegisterForm,
        },
        {
          name: "experience",
          type: "select",
          label: "Experience in years",
          options: Array.from({ length: 21 }, (_, i) => i),
          required: true,
          form: registerForm,
          dispatchFunc: setRegisterForm,
        },
        {
          title: "Choose technologies",
          description:
            "Select the technologies you are competent in and press Submit",
          type: "check",
          label: "Technologies",
          name: "technologies",
          options: techData,
          required: true,
          checkedList:[],
          Icon:<ScienceIcon/> ,
          dispatchFunc:setRegisterForm
        }
      ]}
    />
  )}
</div>
      <BasicButtons text={"Submit"} onClick={handleSubmit} />
      <CustomLinkNavigate
        text={"Already have an account?"}
        to={"/"}
        label={"Log In"}
      />
      <Waves color={"#1976D2"} />
    </div>
  );
};

export default RegisterPage;
