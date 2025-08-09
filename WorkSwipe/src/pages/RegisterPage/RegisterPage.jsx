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

  const registerForm = useSelector((state) => state.register.registerForm);

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

  const {
    isLoading: techIsLoading,
    error: techError,
    data: techData,
  } = useQuery({
    queryKey: ["get-all-technologies"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}${technologyRoute}/allTechnologies`
      );
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
      if (role === "Job Seeker") {
        dispatch(setJobSeekerGeneralDetail(data));
      } else if (role === "Employer") {
        dispatch(setEmployerGeneralDetail(data));
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
      <div className="registerContainer">
        <div className="registerHeader">
          <h2 className="registerTitle">Join WorkSwipe</h2>
          <p className="registerSubtitle">Create your professional profile</p>
        </div>
        
        <div className="registerCard">
          <div className="roleSection">
            <h3 className="sectionTitle">Choose Your Role</h3>
            <CustomRadioButton
              onClick={handleRoleChange}
              title={""}
              list={["Job Seeker", "Employer"]}
            />
          </div>

          <div className="formSection">
            <h3 className="sectionTitle">Basic Information</h3>
            <FormComponent
              props={[
                {
                  name: "username",
                  type: "text",
                  formType: "username",
                  label: "Username",
                  required: true,
                  value: registerForm.username || "",
                  onChange: (e) => dispatch(setRegisterForm({ name: "username", value: e.target.value })),
                },
                {
                  name: "password",
                  formType: "password",
                  type: "password",
                  label: "Password",
                  required: true,
                  value: registerForm.password || "",
                  onChange: (e) => dispatch(setRegisterForm({ name: "password", value: e.target.value })),
                },
                {
                  name: "email",
                  formType: "email",
                  type: "email",
                  label: "Email",
                  required: true,
                  value: registerForm.email || "",
                  onChange: (e) => dispatch(setRegisterForm({ name: "email", value: e.target.value })),
                },
                {
                  name: "name",
                  type: "text",
                  label: "Full Name",
                  required: true,
                  value: registerForm.name || "",
                  onChange: (e) => dispatch(setRegisterForm({ name: "name", value: e.target.value })),
                },
              ]}
            />
          </div>

          {role === "Job Seeker" && (
            <>
              <div className="formSection">
                <h3 className="sectionTitle">Professional Details</h3>
                <FormComponent
                  props={[
                    {
                      name: "experience",
                      type: "select",
                      label: "Years of Experience",
                      options: Array.from({ length: 21 }, (_, i) => i),
                      required: true,
                      value: registerForm.experience || "",
                      onChange: (e) => dispatch(setRegisterForm({ name: "experience", value: e.target.value })),
                    },
                    {
                      name: "location",
                      type: "text",
                      label: "Location",
                      required: false,
                      value: registerForm.location || "",
                      onChange: (e) => dispatch(setRegisterForm({ name: "location", value: e.target.value })),
                    },
                  ]}
                />
              </div>

              <div className="formSection">
                <h3 className="sectionTitle">Skills & Technologies</h3>
                <FormComponent
                  props={[
                    {
                      title: "Choose your tech stack",
                      description:
                        "Select the technologies you're skilled in",
                      type: "check",
                      label: "Technologies",
                      name: "technologies",
                      options: techData,
                      required: true,
                      checkedList: registerForm.technologies || [],
                      Icon: <ScienceIcon />,
                      selectDispatchFunc: (technologies) => setRegisterForm({ name: "technologies", value: technologies }),
                      onSubmit: (name, value) => dispatch(setRegisterForm({ name, value })),
                    },
                  ]}
                />
              </div>

              <div className="formSection">
                <h3 className="sectionTitle">Links & Profile</h3>
                <FormComponent
                  props={[
                    {
                      name: "image",
                      type: "text",
                      label: "Profile Picture URL",
                      required: false,
                      value: registerForm.image || "",
                      onChange: (e) => dispatch(setRegisterForm({ name: "image", value: e.target.value })),
                    },
                    {
                      name: "linkedInUrl",
                      type: "text",
                      label: "LinkedIn Profile",
                      required: false,
                      value: registerForm.linkedInUrl || "",
                      onChange: (e) => dispatch(setRegisterForm({ name: "linkedInUrl", value: e.target.value })),
                    },
                    {
                      name: "gitHubUrl",
                      type: "text",
                      label: "GitHub Profile",
                      required: false,
                      value: registerForm.gitHubUrl || "",
                      onChange: (e) => dispatch(setRegisterForm({ name: "gitHubUrl", value: e.target.value })),
                    },
                  ]}
                />
              </div>
            </>
          )}

          <div className="submitSection">
            <BasicButtons text={"Create Account"} onClick={handleSubmit} />
            <CustomLinkNavigate
              text={"Already have an account?"}
              to={"/"}
              label={"Sign In"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
