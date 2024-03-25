import './App.css';
import {Route,Routes} from "react-router-dom"
import Homepage from './pages/Homepage/Homepage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";

function App() {
  

  const icons = [
    AccountBoxIcon,
    JoinInnerIcon,
    ContactSupportIcon,
    InfoIcon,
    LogoutIcon,
  ];

  const hrefs = ["/profile", "/matches", "/support", "/about", "/logout"];

  return (
    <>
    <CustomDrawer
        items={["Profile", "Matches", "Support", "About Us", "Logout"]}
        icons={icons}
        hrefs={hrefs}
      />
<Routes>
<Route path="/home" element={<Homepage/>} />
<Route path="/profile" element={<ProfilePage/>} />
</Routes>
</>
  );
}

export default App;

