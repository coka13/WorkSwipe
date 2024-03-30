import "./Login.css";
import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/ButtonsComponent/ButtonsComponent";
import { Routes, Route, Link } from "react-router-dom";
import SwitchAuthComponent from "../../components/SwitchAuthComponent/SwitchAuthComponent";

const Login = () => {
  const formProps = [
    { name: "username", type: "text", label: "username", required: true },
    { name: "password", type: "password", label: "password", required: true },
  ];

  return (
    <>
      <div className="loginPage">
        <div className="loginBox">
          <h4>Login</h4>
          <FormComponent props={formProps} />
          <BasicButtons text={"Submit"} />
          <SwitchAuthComponent 
            text={"Doesnt have an account yet?"}
            to={"/Register"}
            label={"Sign Up"}
           
          />
          <Waves />
        </div>
      </div>
    </>
  );
};

export default Login;
