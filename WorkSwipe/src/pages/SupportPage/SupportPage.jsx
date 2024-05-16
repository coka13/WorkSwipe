
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";

import "./SupportPage.css";

const SupportPage = () => {
  
  return (
    <>
    <div className="title">
    <h4 >Help & Support</h4>
    </div>
    <div className="supportPage">
      <CustomLinkNavigate
        text={"You can also"}
        to={"/contact"}
        label={"contact us"}
        fontSize="16px"
      />
    </div>
    </>
  );
};

export default SupportPage;
