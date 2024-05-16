import React from "react";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import Waves from "../../components/Waves/Waves";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import { setRegisterForm } from "../../store/slices/registerSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setGeneralDetail,
  setTechnologies,
} from "../../store/slices/userSlice";
import ScienceIcon from "@mui/icons-material/Science";
import "./RegisterPage.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const registerForm = useSelector((state) => state.register.registerForm);

  const handleSubmit = () => {
    dispatch(setGeneralDetail(registerForm));
  };
  
  return (
    <div className="registerPage">
      <h4>Register</h4>
      <div className="registerBox">
        <FormComponent
          props={[
            {
              name: "username",
              type: "text",
              label: "Username",
              required: true,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

        <FormComponent
          props={[
            {
              name: "password",
              type: "password",
              label: "Password",
              required: true,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

        <FormComponent
          props={[
            {
              name: "email",
              type: "email",
              label: "Email",
              required: true,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />
        <FormComponent
          props={[
            {
              name: "name",
              type: "name",
              label: "Name",
              required: true,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

        <FormComponent
          props={[
            {
              name: "url",
              type: "url",
              label: "Image link",
              required: false,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

        <FormComponent
          props={[
            {
              name: "linkedIn",
              type: "linkedIn",
              label: "LinkedIn link",
              required: false,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

<FormComponent
          props={[
            {
              name: "residence",
              type: "residence",
              label: "residence",
              required: false,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

        <FormComponent
          props={[
            {
              name: "experience",
              type: "select",
              label: "Experience in years",
              options: Array.from({ length: 21 }, (_, i) => i),
              required: true,
            },
          ]}
          form={registerForm }
          dispatchFunc={setRegisterForm}
        />

        <FormComponent
          props={[
            {
              title: "Choose technologies",
              description:
                "Select the technologies you are competent in and press Submit",
              type: "check",
              label: "Technologies",
              options: ["js", "node", "c", "cpp", "HTML", "css", "Python"],
              required: true,
            },
          ]}
          Icon={<ScienceIcon />}
          checkedList={[]}
          dispatchFunc={setTechnologies}
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
