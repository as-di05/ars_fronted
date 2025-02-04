import React, { useEffect } from "react";
import { ListItem, ListItemText, Button, Box, Typography } from "@mui/material";
import {
  GridViewOutlined,
  PeopleOutlined,
  ExitToApp,
  CorporateFareOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const Sidebar: React.FC = () => {
  const currentUserState = useAppSelector((state) => state.currentUser);
  const links: any = [
    {
      id: 1,
      name: "Главное",
      to: "/",
      icon: <GridViewOutlined sx={{ width: "18px" }} />,
    },
    currentUserState?.state?.role && currentUserState?.state?.role.id < 3
      ? {
          id: 2,
          name: "Сотрудники",
          to: "/employees",
          icon: <PeopleOutlined sx={{ width: "18px" }} />,
        }
      : null,
    {
      id: 3,
      name: "Объекты",
      to: "/real-estates",
      icon: <CorporateFareOutlined sx={{ width: "18px" }} />,
    },
    {
      id: 4,
      name: "Избранное",
      to: "/favorites",
      icon: <FavoriteBorderOutlined sx={{ width: "18px" }} />,
    },
  ];

  return (
    <Box
      position={"fixed"}
      width={"20vw"}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 60px)",
        backgroundColor: "#101e37",
        padding: "16px",
      }}
    >
      <Box>
        {links.map((item: any) => {
          if (item === null) return null;
          return (
            <ListItem
              key={item.id}
              component={NavLink}
              to={item.to}
              alignItems="center"
              sx={{
                display: "flex",
                gap: 1,
                color: "#b5b2b7",
                textDecoration: "none",
                "&.active": {
                  color: "#fff",
                },
              }}
            >
              {item.icon}
              <Typography fontSize={"16px"}>{item.name}</Typography>
            </ListItem>
          );
        })}
      </Box>
      <Box
        sx={{ marginTop: "auto" }}
        onClick={() => {
          localStorage.removeItem("jwt");
          window.location.href = "/login";
        }}
      >
        <Button
          variant="contained"
          fullWidth
          startIcon={<ExitToApp />}
          sx={{
            backgroundImage: "linear-gradient(45deg, #656565, #585858)",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundImage: "linear-gradient(45deg, #585858, #656565)",
            },
            borderRadius: "6px",
            paddingY: 1,
          }}
        >
          Выход
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
