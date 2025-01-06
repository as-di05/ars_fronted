import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = ["Все", "Активные", "Завершенные"];
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div style={{ height: "60px" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#625bff",
          boxShadow: 'none',
          height: "60px",
          minHeight: "60px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
            maxWidth={"150px"}
            sx={{
              flexGrow: 1,
            }}
          >
            ARS CRM
          </Typography>
          <SearchBar value={searchTerm} onChange={handleSearchChange} searchWidth="66%" />
          <IconButton color="inherit">
            <Avatar alt="User" src="user-avatar.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
