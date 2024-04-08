import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import { formProps } from "../../dummyData/constants";
import "./RegisterPage.css";

const RegisterPage = () => {
  
  return (
    <>
      <div className="registerPage">
        <div className="registerBox">
          <h4>Register</h4>

          <FormComponent props={formProps} />
          <BasicButtons text={"Submit"} />
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
