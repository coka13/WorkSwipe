import { useState } from "react";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import Waves from "../../components/Waves/Waves";
import { formProps } from "../../dummyData/constants";
import "./RegisterPage.css";

const RegisterPage = () => {
  
  return (
    <>
      <div className="registerPage">
        <div className="registerBox">
          <h4>Register</h4>

          <FormComponent props={formProps} checkedList={[]}></FormComponent>

          <CustomLinkNavigate
            text={"Already have an account?"}
            to={"/"}
            label={"Log In"}
          />
          <Waves color={"#1976D2"} />
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
