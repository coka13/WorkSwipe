import React from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import { supportProps } from "../../dummyData/constants";
import "./SupportPage.css";

const SupportPage = () => {
  
  return (
    <div className="supportPage">
      <h2 className="Header">Help & Support</h2>
      <h4>How Can We Help?</h4>
      <FormComponent props={supportProps} />
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
