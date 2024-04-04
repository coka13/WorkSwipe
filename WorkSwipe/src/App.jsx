import { Route, Routes, useLocation } from "react-router-dom";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import Homepage from "./pages/Homepage/Homepage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";

function App() {
  const location = useLocation();

  const icons = [
    AccountBoxIcon,
    JoinInnerIcon,
    ContactSupportIcon,
    InfoIcon,
    LogoutIcon,
  ];

  const hrefs = ["/profile", "/matches", "/support", "/about", "/"];

  const showDrawer =
    location.pathname === "/home" ||
    location.pathname === "/profile" ||
    location.pathname === "/about" ||
    location.pathname === "/contact" ||
    location.pathname === "/support"; //Show drawer only on existing routes

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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </>
  );
}

export default App;
