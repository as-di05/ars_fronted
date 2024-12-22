import React from "react";
import { ListItem, ListItemText, Button, Box } from "@mui/material";
import {
  GridViewOutlined,
  PeopleOutlined,
  ExitToApp,
  CorporateFareOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Главная",
    to: "/",
    icon: <GridViewOutlined />,
  },
  {
    name: "Сотрудники",
    to: "/employees",
    icon: <PeopleOutlined />,
  },
  {
    name: "Объекты",
    to: "/real-estates",
    icon: <CorporateFareOutlined />,
  },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      position={"fixed"}
      width={"200px"}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 60px)",
        backgroundColor: "#1d2126",
        padding: "16px",
      }}
    >
      <div>
        {links.map((item, index) => {
          return (
            <ListItem
              key={index}
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
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </div>
      <Box sx={{ marginTop: "auto" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ExitToApp />}
          sx={{
            backgroundImage: "linear-gradient(45deg, #625bff, #322d91)",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundImage: "linear-gradient(45deg, #322d91, #625bff)",
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
