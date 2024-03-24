import React from "react";
import { CustomDrawer } from "../../components/CustomDrawer/CustomDrawer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Homepage.css";
import SimpleCard from "../../components/TinderCard/TinderCard";


const Homepage = () => {
  const person = [{
    name: "Richard Hendricks",
    url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    email:"Rich@gmail.com",
    experience: 5,
    technologies: ["React","HTML","Javascript"],
    linkedIn: "https://www.linkedin.com",
    gitHub: "https://www.github.com",
    exp: 5,
    residence: "Kiryat Yam"
  },
  {
  name: "Daniel",
  url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  email:"Rich@gmail.com",
  experience: 5,
  technologies: ["React","HTML","Javascript"],
  linkedIn: "https://www.linkedin.com",
  gitHub: "https://www.github.com",
  exp: 5,
  residence: "Kiryat Yam"
  }
];

  const icons = [
    AccountBoxIcon,
    JoinInnerIcon,
    ContactSupportIcon,
    InfoIcon,
    LogoutIcon,
  ];

  return (
    <div className="homePage">
      <CustomDrawer
        items={["Profile", "Matches", "Support", "About Us", "Logout"]}
        icons={icons}
      />
      <div className="swipeArea">
        <SimpleCard db={person} />
      </div>
    </div>
  );
};

export default Homepage;
