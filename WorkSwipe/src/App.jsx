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
import MatchesPage from "./pages/MatchesPage/MatchesPage";
import EmployerPage from "./pages/EmployerPage/EmployerPage";
import CustomRoute from "./components/CustomRoute/CustomRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminSupportPage from "./pages/AdminSupportPage/AdminSupportPage";
import { setSystemTechnologies } from "./store/slices/techSlice";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, jobOpportunityRoute, technologyRoute } from "./utils/routes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
 
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-all-technologies"], // key
    queryFn: async () => {
      const response = await fetch(
        baseUrl + technologyRoute + "/allTechnologies"
      );
      const jsonData = await response.json();
      return jsonData;
    },
  });








  useEffect(()=>{
    dispatch(setSystemTechnologies(data));
  },[data])

  const user = useSelector((state) => state.auth);


  const { showDrawer, icons, hrefs, items } = useDrawerLogic(user.role);
   // Fetch system technologies
   const { data: techData, error: techError, isLoading: techLoading } = useQuery({
    queryKey: ["get-all-technologies"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}${technologyRoute}/allTechnologies`
      );
      const jsonData = await response.json();
      return jsonData;
    },
  });

  useEffect(() => {
    if (techData) {
      dispatch(setSystemTechnologies(techData));
    }
  }, [techData, dispatch]);

  
    
    return (
      <>
      {showDrawer && <CustomDrawer items={items} icons={icons} hrefs={hrefs} />}
      <Routes>
        <Route path="/" element={<LoginPage />} index={true} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <CustomRoute
              nav={"/"}
              role={["Job Seeker", "Employer", "Admin"]}
              element={<Homepage />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <CustomRoute
              nav={"/home"}
              role={["Job Seeker", "Employer", "Admin"]}
              element={<ProfilePage />}
            />
          }
        />

        <Route
          path="/matches"
          element={
            <CustomRoute
              nav={"/home"}
              role={["Job Seeker", "Employer"]}
              element={<MatchesPage />}
            />
          }
        />
        <Route
          path="/employer"
          element={
            <CustomRoute
              nav={"/home"}
              role={["Employer"]}
              element={<EmployerPage />}
            />
          }
        />
        <Route
          path="/about"
          element={
            <CustomRoute
              nav={"/home"}
              role={["Job Seeker", "Employer", "Admin"]}
              element={<AboutPage />}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <CustomRoute
              nav={"/home"}
              role={["Job Seeker", "Employer"]}
              element={<ContactPage />}
            />
          }
        />
        <Route
          path="/support"
          element={
            <CustomRoute
              nav={"/home"}
              role={["Job Seeker", "Employer"]}
              element={<SupportPage />}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <CustomRoute
              nav={"/"}
              role={["Admin"]}
              element={<AdminPage />}
            />
          }
        />
        <Route
          path="/adminsupport"
          element={
            <CustomRoute
              nav={"/"}
              role={["Admin"]}
              element={<AdminSupportPage />}
            />
          }
        />
            <Route
          path="/recruit"
          element={
            <CustomRoute
              nav={"/"}
              role={["Admin","Employer"]}
              element={<EmployerPage />}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
