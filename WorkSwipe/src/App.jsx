import { Route, Routes } from "react-router-dom";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import Homepage from "./pages/Homepage/Homepage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useDrawerLogic } from "./utils/drawerRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  setOpportunities } from "./store/slices/jobOffersSlice";
import MatchesPage from "./pages/MatchesPage/MatchesPage";
import EmployerPage from "./pages/EmployerPage/EmployerPage";
import { setSystemTechnologies } from "./store/slices/techSlice";
import "./App.css";

function App() {
  const { showDrawer, icons, hrefs, items } = useDrawerLogic();
  const dispatch = useDispatch();

  const isEmployer = useSelector((state) => state.users.isEmployer);
  const userTechnologies = useSelector((state) => state.users.technologies);
  const systemTechnologies = useSelector((state) => state.technologies.technologies);
  const personTechnologies=useSelector((state)=>state.users.technologies)

 



 

  useEffect(() => {
    dispatch(
      setOpportunities({
        technologies: personTechnologies,
        opportunities: [{
          _id: 0,
          name: "Nvidia",
          position: "Embedded developer",
          url: "data:image/jpeg;base64,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",
          email: "NvidiaHR@gmail.com",
          technologies: ["c", "cpp"],
          niceToHave: ["python", "assembly"],
          linkedIn: "https://www.linkedin.com",
          exp: 5,
          location: "Haifa",
        },
        {
          _id: 1,
          name: "Apple",
          position: "Fullstack developer",
          url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
          email: "AppleHR@gmail.com",
          technologies: ["c", "c#"],
          niceToHave: ["css"],
          linkedIn: "https://www.linkedin.com",
          exp: 5,
          location: "Tel Aviv",
        }
      ] ,
      })
    );
  }, [userTechnologies]);

  useEffect(() => {
    if (systemTechnologies.length === 0) {
      dispatch(
        setSystemTechnologies(["JS", "nodeJS", "c", "cpp", "HTML", "CSS", "Python"])
      );
    }
  }, [systemTechnologies]); 
  

  return (
    <>
      {showDrawer && (
        <CustomDrawer
          items={items}
          icons={icons}
          hrefs={hrefs}
          isEmployer={isEmployer}
        />
      )}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/employer" element={<EmployerPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
