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
import CustomRadioButton from "../../components/CustomRadioButton/CustomRadioButton";
import {  useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [role, setRole] = useState("Job Seeker"); 
  const dispatch = useDispatch();
  const registerForm = useSelector((state) => state.register.registerForm);
  const userTechnologies = useSelector((state) => state.users.technologies);
const systemTechnologies=useSelector((state)=>state.technologies.technologies)

  const onClick = (e) => {
    setRole(e.target.value);
  };




  const handleSubmit = () => {
    if (
    
      registerForm.username &&
      registerForm.password &&
      registerForm.name &&
      registerForm.email &&
      userTechnologies.length > 0
    ) {
      
      dispatch(setGeneralDetail(registerForm));
    }
  };

  return (
    <div className="registerPage">
      <h4>Register</h4>
      <div className="registerBox">
        <CustomRadioButton
          title={"Choose role"}
          list={["Job seeker", "Employer"]}
          onClick={onClick}
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
              name: "url",
              type: "url",
              label: "Image link",
              required: false,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "linkedIn",
              type: "linkedIn",
              label: "LinkedIn link",
              required: false,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "GitHub link",
              type: "GitHub",
              label: "GitHub link",
              required: false,
              form: registerForm,
              dispatchFunc: setRegisterForm,
            },
            {
              name: "residence",
              type: "residence",
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
              options: systemTechnologies,
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
