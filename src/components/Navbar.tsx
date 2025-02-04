import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import SearchBar from "./SearchBar";
import { IUser } from "../types/types";
import UserCard from "./UserCard";
import { useAppSelector } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { searchFilterProperty } from "../features/searchRealEstate/searchRealEstateSlice";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserState = useAppSelector((state) => state.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<IUser | null>(null);

  const filterOptions = ["Все", "Активные", "Завершенные"];
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (currentUserState.state) {
      setUser(currentUserState.state);
    }
  }, [currentUserState]);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      navigate("/search");
      dispatch(searchFilterProperty(searchTerm));
    } else {
      dispatch(searchFilterProperty(""));
    }
  }, [searchTerm]);

  return (
    <div style={{ height: "60px" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#625bff",
          boxShadow: "none",
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
            TURAN CRM
          </Typography>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            searchWidth="66%"
          />
          <IconButton color="inherit">
            <UserCard
              size="big"
              bgcolor="#fff"
              color="#625bff"
              firstName={user?.firstName ?? ""}
              lastName={user?.lastName ?? ""}
              avatarUrl={user?.avatarUrl}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
