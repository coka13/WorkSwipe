
import { useSelector } from "react-redux";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";

import Conversation from "../../components/Conversation/Conversation";
import "./SupportPage.css";

const SupportPage = () => {
  const user = useSelector((state)=>state.auth.role)

  const admin = {
      _id:0,
      username: "adminUser",
      name: "Admin User",
      isEmployer: false,
      isAdmin: true,
      email: "adminuser@example.com",
      url: "https://cdn-icons-png.flaticon.com/512/2304/2304226.png"
    }

  
  return (
    <>
    <div className="title">
    <h4 >Help & Support</h4>
    </div>
    <div className="supportPage">
    <Conversation user1={user} user2={admin} />
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
