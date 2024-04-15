import "./SecurityPage.css"
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import { securitySettingsProps } from "../../dummyData/constants";

const SecurityPage = () => {
  return (
    <div className="securityPage">
      <h4>Security settings</h4>
      <FormComponent props={securitySettingsProps}/>
      <BasicButtons text={"Submit"}/>
    </div>
  );
};

export default SecurityPage;
