import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from './pages/Login/Login';


function App() {
  const location = useLocation();

  const icons = [
    AccountBoxIcon,
    JoinInnerIcon,
    ContactSupportIcon,
    InfoIcon,
    LogoutIcon,
  ];

  const hrefs = ["/profile", "/matches", "/support", "/about", "/logout"];

  const isHomeRoute = location.pathname === "/";
  const showDrawer = !isHomeRoute; // Hide drawer on / route

  return (
    <>
      {showDrawer && (
        <CustomDrawer
          items={["Profile", "Matches", "Support", "About Us", "Logout"]}
          icons={icons}
          hrefs={hrefs}
        />
      )}
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
