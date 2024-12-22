import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";

const Navbar: React.FC = () => {
  return (
    <div style={{ height: "60px" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#625bff",
          boxShadow: "-moz-initial",
          height: "60px",
          minHeight: "60px",
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: "60px",
              sm: "60px",
            },
            paddingX: {
              sm: 2,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            ARS CRM
          </Typography>
          <IconButton color="inherit">
            <Avatar alt="User" src="user-avatar.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
