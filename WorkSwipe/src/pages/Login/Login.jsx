import React from "react";
import "./Login.css";
import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/ButtonsComponent/ButtonsComponent";

const Login = () => {
  const formProps = [
    { name: "username", type: "text", placeholder: "username" },
    { name: "password", type: "password", placeholder: "password" },
  ];
  return (
    <>
      <div className="loginPage">
        <div className="loginBox">
          <h4>Login</h4>
          <FormComponent props={formProps} />
          <BasicButtons text={"Register"} sx={{color:"#1976D2"}} />
          <Waves color="#1976D2" />
        </div>
      </div>
    </>
  );
};

export default Login;
