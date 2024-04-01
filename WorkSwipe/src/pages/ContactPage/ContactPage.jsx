import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./ContactPage.css";

const ContactPage = () => {
  const contactProps = [
    { name: "Name", type: "text", label: "username", required: true },
    { name: "Email", type: "text", label: "email", required: true },
    { name: "Phone", type: "text", label: "phone", required: true },
  ];
  return (
    <div className="contactBox">
      <h4>Contact Us</h4>
      <p className="contactUs">
        As developers we love to hear about new ideas and we must be aware of
        bugs and complaints. be sure to reach us via Email at{" "}
        <a href="mailto:Work_Swipe@gmail.com">Work_Swipe@gmail.com</a>.
      </p>
      <p>
        You could also leave your contact below and we will do our best to reach
        You:
      </p>
      <div className="contactForm">
        <FormComponent props={contactProps} />
        <BasicButtons text={"Submit"}/>
      </div>
      <CustomLinkNavigate 
      text={""}
        to={"/support"}
        label={"Help & Support"}/>
    </div>
  );
};

export default ContactPage;
