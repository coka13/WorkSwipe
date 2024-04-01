import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/ButtonsComponent/ButtonsComponent";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import "./Login.css";

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

export default Login;
