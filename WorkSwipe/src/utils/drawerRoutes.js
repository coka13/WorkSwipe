import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkIcon from '@mui/icons-material/Work';

export function useDrawerLogic() {
  const location = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setShowDrawer(
      location.pathname === "/home" ||
        location.pathname === "/profile" ||
        location.pathname === "/about" ||
        location.pathname === "/contact" ||
        location.pathname === "/support"
    );
  }, [location.pathname]);

  const icons = [
    AccountBoxIcon,
    JoinInnerIcon,
    ContactSupportIcon,
    InfoIcon,
    WorkIcon,
    LogoutIcon,
  ];

  const hrefs = [
    "/profile",
    "/matches",
    "/support",
    "/about",
    "/employer",
    "/",
  ];

  const items = ["Profile", "Matches", "Support", "About Us", "Logout"];

  return { showDrawer, icons, hrefs, items };
}
