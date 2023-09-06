import React, { useState, useContext } from "react";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

import { LibraryContext } from "../context";
import Notification from "./common/Notification";

const settings = ["Logout"];

const Header = () => {
  const cachedStatus = localStorage.getItem("loggedInStatus");
  const { loggedInStatus, showNotification, updateLoggedInStatus } =
    useContext(LibraryContext);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      {showNotification.open && <Notification msg={showNotification.msg} type={showNotification.type} />}

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RAB
          </Typography>

          {(cachedStatus || loggedInStatus === "logged-in") && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      localStorage.removeItem("loggedInStatus");
                      updateLoggedInStatus("logged-out");
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
