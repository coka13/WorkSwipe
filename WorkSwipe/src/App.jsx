import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/ContactPage/ContactPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import "./App.css";

function App() {
  const location = useLocation();

  const icons = [
    AccountBoxIcon,
    JoinInnerIcon,
    ContactSupportIcon,
    InfoIcon,
    SettingsApplicationsSharpIcon,
    LogoutIcon
  ];

  const hrefs = ["/profile", "/matches", "/support", "/about","settings", "/"];

  const showDrawer =
    location.pathname === "/home" ||
    location.pathname === "/profile" ||
    location.pathname === "/about" ||
    location.pathname === "/contact" ||
    location.pathname === "/support" ||
    location.pathname === "/settings" ||
    location.pathname === "/security"; //Show drawer only on existing routes

  return (
    <>
      {showDrawer && (
        <CustomDrawer
          items={["Profile", "Matches", "Support", "About Us",  "Settings", "Logout"]}
          icons={icons}
          hrefs={hrefs}
        />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<Homepage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="support" element={<SupportPage/>}/>
        <Route path="settings" element={<SettingsPage />} />
        <Route path="security" element={<SecurityPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
