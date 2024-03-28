import Waves from "../../components/Waves/Waves";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/ButtonsComponent/ButtonsComponent";
import "./Register.css";

const Register = () => {
  const formProps = [
    { name: "username", type: "text", placeholder: "username" },
    { name: "password", type: "password", placeholder: "password" },
    { name: "email", type: "email", placeholder: "Email" },
    {
      name: "experience-in-years",
      type: "select",
      placeholder: "Experience in Years",
      options: ["1", "2", "3", "4-6", "7-9", "10+"],
    },
    {
      name: "technologies",
      type: "select",
      placeholder: "Technologies",
      options: ["js", "node"],
    },
  ];
  return (
    <div className="RegisterBox">
      Register
      <div className="TextFieldBox">
        <FormComponent className="formFields" props={formProps} />

        <BasicButtons text={"Submit"} />
      </div>
      <Waves  />
    </div>
  );
};

export default Register;
