import React from "react";
import "./SupportPage.css";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import TextArea from "../../components/TextArea/TextArea";

const SupportPage = () => {
  const supportProps = [
    {
      name: "How can we help you",
      type: "text",
      label: "HowCanWeHelp",
      required: false,
      
    },
  ];
  return (
    <div className="supportPage">
      <h2 className="Header">Help & Support</h2>
      <h4 >How Can We Help?</h4>
     <TextArea props={supportProps} />
      <BasicButtons text={"submit"} />
      <CustomLinkNavigate
        text={"You can also"}
        to={"/contact"}
        label={"contact us"}
        fontSize="16px"
      />
    </div>
  );
};

export default SupportPage;
