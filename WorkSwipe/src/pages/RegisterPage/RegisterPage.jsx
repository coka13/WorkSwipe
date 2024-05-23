import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import Waves from "../../components/Waves/Waves";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import { setRegisterForm } from "../../store/slices/registerSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setJobSeekerGeneralDetail,
  setJobSeekerTechnologies,
} from "../../store/slices/jobSeekerSlice";
import { setEmployerGeneralDetail } from "../../store/slices/employerSlice";
import { setAdminGeneralDetail } from "../../store/slices/adminSlice";
import ScienceIcon from "@mui/icons-material/Science";
import { baseUrl, technologyRoute } from "../../utils/routes";
import { useQuery } from "@tanstack/react-query";
import "./RegisterPage.css";
import { setSystemTechnologies } from "../../store/slices/techSlice";
import { useState } from "react";

const RegisterPage = () => {
  const [role, setRole] = useState("Job Seeker");
  const dispatch = useDispatch();
  const onClick = (e) => {
    setRole(e.target.value);
  };

  const registerForm = useSelector((state) => state.register.registerForm);
  const userTechnologies = useSelector((state) => state.users.technologies);

  const { techData, techError, techIsLoading } = useQuery({
    queryKey: ["get-all-technologies"], // key
    queryFn: async () => {
      const response = await fetch(
        baseUrl + technologyRoute + "/allTechnologies"
      );
      const jsonData = await response.json();
      dispatch(setSystemTechnologies(jsonData));
      return jsonData;
    },
  });

  if (techIsLoading) {
    return <div>Loading...</div>;
  }

  if (techError) {
    return <div>Error: {error.message}</div>;
  }
  const { registerData, registerError, registerIsLoading } = useQuery({
    queryKey: ["register"], // key
    queryFn: async () => {
      const response = await fetch(
        setUrlByRole(),

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    },
  });
  const setUrlByRole = () => {
    if (role === "Job Seeker") {
      return baseUrl + jobSeekerRoute + "/createJobSeeker";
    } else if (role === "Employer") {
      return baseUrl + employerRoute + "/createEmployer";
    } else {
      return baseUrl + adminRoute + "/createAdmin";
    }
  };
  const setFormDataByRole = () => {
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
};

const handleSubmit = () => {

  
    if (role === "Job Seeker"&&  registerForm.username &&
    registerForm.password &&
    registerForm.name &&
    registerForm.email &&
    userTechnologies.length > 0) {
      dispatch(setJobSeekerGeneralDetail(registerForm));
    } else if (role === "Employer") {
      dispatch(setEmployerGeneralDetail(registerForm));
    } else {
      dispatch(setAdminGeneralDetail(registerForm));
    }
  }

  return (
    <div className="registerPage">
      <h4>Register</h4>
      <div className="registerBox">
        <CustomRadioButton
          onClick={onClick}
          title={"Choose role"}
          list={["Job seeker", "Employer"]}
        />
        <FormComponent
          props={[
            {
              name: "username",
              type: "text",
              label: "Username",
              required: true,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "password",
              type: "password",
              label: "Password",
              required: true,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "email",
              type: "email",
              label: "Email",
              required: true,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "name",
              type: "name",
              label: "Name",
              required: true,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "image",
              type: "image",
              label: "Image link",
              required: false,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "linkedInUrl",
              type: "linkedInUrl",
              label: "LinkedIn link",
              required: false,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "gitHubUrl",
              type: "gitHubUrl",
              label: "GitHub link",
              required: false,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "location",
              type: "location",
              label: "residence",
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
              options: techData,
              required: true,
              checkedList: [],
              Icon: <ScienceIcon />,
              dispatchFunc: setTechnologies,
            },
          ]}
        />
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
