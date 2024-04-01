import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/ButtonsComponent/ButtonsComponent";
import SwitchAuthComponent from "../../components/SwitchAuthComponent/SwitchAuthComponent";
import "./RegisterPage.css";

const RegisterPage = () => {
  const formProps = [
    { name: "username", type: "text", label: "username", required: true },
    { name: "password", type: "password", label: "password", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    {
      name: "experience-in-years",
      type: "select",
      label: "Experience in years",
      options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ],
      required: true,
    },
    {
      name: "technologies",
      type: "check",
      label: "Technologies",
      options: [
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
        "js",
        "node",
      ],
      required: true,
    },
  ];
  return (
    <>
      <div className="registerPage">
        <div className="registerBox">
          <h4>Register</h4>

          <FormComponent props={formProps} />
          <BasicButtons text={"Submit"} />
          <SwitchAuthComponent
            text={"Already have an account?"}
            to={"/"}
            label={"Log In"}
          />
          <Waves />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
