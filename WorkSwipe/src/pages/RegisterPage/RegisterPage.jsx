
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import Waves from "../../components/Waves/Waves";

import "./RegisterPage.css";

const RegisterPage = () => {
  
  return (
    <>
      <div className="registerPage">
        <div className="registerBox">
          <h4>Register</h4>

          <FormComponent props={[
  { name: "username", type: "text", label: "username", required: true },
  { name: "password", type: "password", label: "password", required: true },
  { name: "email", type: "email", label: "Email", required: true },
  {
    name: "experience-in-years",
    type: "select",
    label: "Experience in years",
    options: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    required: true,
  },
  {
    title:"Choose technologies",
    description:"Select the technologies you are competent in and press Submit",
    name: "technologies",
    type: "check",
    label: "Technologies",
    options: [
      "js",
      "node",
      "c",
      "cpp",
      "HTML",
      "css",
      "Python"
    ],
    required: true
  },
]} checkedList={[]}></FormComponent>

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
