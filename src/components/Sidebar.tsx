import React from "react";
import { ListItem, ListItemText, Button, Box, Typography } from "@mui/material";
import {
  GridViewOutlined,
  PeopleOutlined,
  ExitToApp,
  CorporateFareOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Главное",
    to: "/",
    icon: <GridViewOutlined sx={{ width: "18px" }} />,
  },
  {
    name: "Сотрудники",
    to: "/employees",
    icon: <PeopleOutlined sx={{ width: "18px" }} />,
  },
  {
    name: "Объекты",
    to: "/real-estates",
    icon: <CorporateFareOutlined sx={{ width: "18px" }} />,
  },
];

const Sidebar: React.FC = () => {
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
              <Typography fontSize={"16px"}>{item.name}</Typography>
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
