import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import "./LoginPage.css";

const LoginPage = () => {
  
  return (
    <>
      <div className="loginPage">
        <div className="loginBox">
          <h4>Login</h4>
          <FormComponent props={[
  { name: "username", type: "text", label: "username", required: true },
  { name: "password", type: "password", label: "password", required: true },
]} />
          <BasicButtons text={"Submit"} />
          <CustomLinkNavigate
            text={"Doesnt have an account yet?"}
            to={"/Register"}
            label={"Sign Up"}
          />
          <Waves color={"#1976D2"}/>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
