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
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Contact from './pages/Contact/Contact';
import Support from './pages/Support/Support';
import About from './pages/About/About';


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


  const showDrawer =  (location.pathname === "/home" || location.pathname === "/profile") //Show drawer only on existing routes

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
        <Route path="/" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="support" element={<Support />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
