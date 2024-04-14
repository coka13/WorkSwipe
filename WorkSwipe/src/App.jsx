// App.js
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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { person, swipeProps } from "./dummyData/constants";
import { setGeneralDetail, setTechnologies } from "./store/slices/userSlice";
import { setOpportunities } from "./store/slices/jobOffersSlice";
import "./App.css";

function App() {
  const { showDrawer, icons, hrefs, items } = useDrawerLogic();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGeneralDetail(person));
    dispatch(setOpportunities(swipeProps));
  }, []);
  return (
    <>
      {showDrawer && <CustomDrawer items={items} icons={icons} hrefs={hrefs} />}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
