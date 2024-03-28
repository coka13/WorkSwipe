import "./Login.css";
import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/ButtonsComponent/ButtonsComponent";

const Login = () => {
  const formProps = [
    { name: "username", type: "text", label: "username" ,required: true},
    { name: "password", type: "password", label: "password" ,required: true},
  ];
  return (
    <>
      <div className="loginPage">
        <div className="loginBox">
          <h4>Login</h4>
          <FormComponent props={formProps} />
          <BasicButtons text={"Register"}  />
          <Waves  />
        </div>
      </div>
    </>
  );
};

export default Login;
