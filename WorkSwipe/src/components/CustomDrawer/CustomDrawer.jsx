// CustomDrawer.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import CustomLinkNavigate from "../CustomLinkNavigate/CustomLinkNavigate";
import { useDispatch, useSelector } from "react-redux";
import { jobSeekerLogout } from "../../store/slices/jobSeekerSlice";
import { adminLogout } from "../../store/slices/adminSlice";
import { employerLogout } from "../../store/slices/employerSlice";
import { authLogout, setAuthentication, setUserRole } from "../../store/slices/authSlice";
import "./CustomDrawer.css";

const drawerWidth = 240;

export function CustomDrawer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { window, items, icons, hrefs } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const role = useSelector((state) => state.auth.role);
  const handleLogout = () => {
    dispatch(authLogout())
    dispatch(setAuthentication(false));
    if (role === "Admin") {
      dispatch(adminLogout());
    } else if (role === "Employer") {
      dispatch(employerLogout());
    } else {
      dispatch(jobSeekerLogout());
    }
    navigate("/");
  };

  const drawer = (
    <div className="modern-drawer">
      <div className="drawer-header">
        <div className="brand-section" onClick={() => navigate("/home")}>
          <div className="brand-logo">
            <span className="brand-icon">💼</span>
          </div>
          <div className="brand-text">
            <h3 className="brand-title">WorkSwipe</h3>
            <p className="brand-subtitle">Find Your Match</p>
          </div>
        </div>
      </div>
      
      <div className="user-profile-section">
        <div className="user-avatar">
          <span className="avatar-placeholder">👤</span>
        </div>
        <div className="user-info">
          <p className="user-role">{role}</p>
          <p className="user-status">Active</p>
        </div>
      </div>

      <div className="navigation-section">
        <List className="nav-list">
          {items.map((text, index) => {
            const Icon = icons[index];
            const href = hrefs[index];
            const isLogout = text === "Logout";
            
            return (
              <div key={text} className="nav-item-wrapper">
                {!isLogout ? (
                  <CustomLinkNavigate to={href} className="nav-link">
                    <ListItem className={`nav-item ${isLogout ? 'logout-item' : ''}`}>
                      <ListItemButton
                        className="nav-button"
                        onClick={isLogout ? handleLogout : undefined}
                      >
                        <ListItemIcon className="nav-icon">
                          <Icon />
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          className="nav-text"
                        />
                      </ListItemButton>
                    </ListItem>
                  </CustomLinkNavigate>
                ) : (
                  <ListItem className="nav-item logout-item">
                    <ListItemButton
                      className="nav-button logout-button"
                      onClick={handleLogout}
                    >
                      <ListItemIcon className="nav-icon logout-icon">
                        <Icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        className="nav-text logout-text"
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </div>
            );
          })}
        </List>
      </div>

      <div className="drawer-footer">
        <div className="app-version">
          <p>v2.0</p>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: "block", sm: "none" },
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>💼</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>WorkSwipe</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Find Your Match</div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="navigation drawer"
        >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              backdropFilter: "blur(10px)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      </Box>
    </>
  );
}

export default CustomDrawer;
