
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
        <h4>Help & Support</h4>
      </div>
      <div className="supportPage">
        <div className="chat-introduction">
          <h3>🎯 Live Support Chat</h3>
          <p>Get instant help from our WorkSwipe support team. We're here to assist with any questions about job matching, profiles, or technical issues.</p>
          <div className="support-features">
            <span className="support-feature">⚡ Instant Response</span>
            <span className="support-feature">🔒 Secure & Private</span>
            <span className="support-feature">👨‍💼 Expert Help</span>
          </div>
        </div>
        
        <div className="support-status">
          <div className="status-dot"></div>
          <span>Support team is online</span>
        </div>
        
        <div className="chat-container">
          <Conversation user1={user} user2={admin} />
        </div>
        
        <CustomLinkNavigate
          text={"Need more help?"}
          to={"/contact"}
          label={"📧 Contact us directly"}
          fontSize="16px"
        />
      </div>
    </>
  );
};

export default SupportPage;
