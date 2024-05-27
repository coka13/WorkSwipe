import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export function useDrawerLogic(userRole) {
  const location = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setShowDrawer(
      location.pathname === "/home" ||
        location.pathname === "/profile" ||
        location.pathname === "/about" ||
        location.pathname === "/contact" ||
        location.pathname === "/support" ||
        location.pathname === "/matches" ||
        location.pathname === "/register" ||
        location.pathname === "/admin" ||
        location.pathname === "/adminsupport" ||
        location.pathname === "/recruit" 
    );
  }, [location.pathname]);

  if (userRole === "Job Seeker") {
    const icons = [
      AccountBoxIcon,
      JoinInnerIcon,
      ContactSupportIcon,
      InfoIcon,
      LogoutIcon,
    ];

    const hrefs = ["/profile", "/matches", "/support", "/about", "/"];

    const items = ["Profile", "Matches", "Support", "About Us", "Logout"];

    return { showDrawer, icons, hrefs, items };
  } else if (userRole === "Admin") {
    const icons = [
      AccountBoxIcon,
      AdminPanelSettingsIcon,
      SupportAgentIcon,
      LogoutIcon,
    ];

    const hrefs = ["/profile", "/admin", "/adminsupport", "/"];

    const items = ["Profile", "Admin Panel", "Support", "Logout"];

    return { showDrawer, icons, hrefs, items };
  } else if (userRole === "Employer") {
    const icons = [
      AccountBoxIcon,
      JoinInnerIcon,
      PersonSearchIcon,
      ContactSupportIcon,
      InfoIcon,
      LogoutIcon,
    ];

    const hrefs = [
      "/profile",
      "/matches",
      "/recruit",
      "/support",
      "/about",
      "/",
    ];

    const items = [
      "Profile",
      "Matches",
      "Recruit",
      "Support",
      "About Us",
      "Logout",
    ];

    return { showDrawer, icons, hrefs, items };
  }
}
