import React from "react";
import "./SupportPage.css";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";

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
      <FormComponent props={supportProps} />
      <BasicButtons text={"submit"} />
      <div className="supportTopics">
        <h4>Popular topics:</h4>
        <CustomLinkNavigate
          text={""}
          to={"/"}
          label={"Account settings"}
          fontSize="36px"
        />
        <CustomLinkNavigate
          text={""}
          to={"/"}
          label={"Security & Password"}
          fontSize="36px"
        />
      </div>
    </div>
  );
};

export default SupportPage;
