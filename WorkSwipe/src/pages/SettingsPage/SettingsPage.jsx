import BasicButtons from "../../components/BasicButtons/BasicButtons";
import FormComponent from "../../components/FormComponent/FormComponent";
import {userProps} from "../../dummyData/constants";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

const SettingsPage = () => {
  const navigate = useNavigate()
  const handleSecuritySettingsClicked=()=>{
navigate("/security")
  }
  return (
    <div className="SettingsPage">
      <div className="headers">
        <h2>Settings</h2>
        <h4>Edit details:</h4>
        <FormComponent props={userProps}/>
        <div className="buttonBox">
        <BasicButtons text={"Submit"} />
                  
        <BasicButtons text={"Security settings"} onClick={handleSecuritySettingsClicked}/>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
