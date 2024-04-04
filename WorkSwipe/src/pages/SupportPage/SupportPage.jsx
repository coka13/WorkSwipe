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
      <h4>Help & Support</h4>
     <TextArea label={"Write us"} name={"How can we help you"} type={"textarea"} />
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
