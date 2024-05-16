import BasicButtons from "../../components/BasicButtons/BasicButtons";
import { ContactUs } from "../../components/ContactUs/ContactUs";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contactBox">
    <div className="contactForm">
      <ContactUs />
    </div>


    <CustomLinkNavigate text={""} to={"/support"} label={"Help & Support"} />
    </div>
  );
};

export default ContactPage;
