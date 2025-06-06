import React, { useState } from "react";
import { Box } from "@mui/material";
import Container from "../containers/Container";
import { useNavigate } from "react-router-dom";
import { NavigateNextOutlined } from "@mui/icons-material";
import AddUserContainer from "../containers/AddUserContainer";

const NewEmployeePage: React.FC = () => {
  const navigate = useNavigate();

  const renderRoutes = () => {
    return (
      <Container
        sx={{
          alignItems: "start",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
        padding={"8px 16px"}
        height={"auto"}
      >
        <Box fontSize={"12px"} display={"flex"} alignItems={"center"}>
          <Box
            onClick={() => navigate("/")}
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            color={"#00000066"}
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "#625bff",
              },
            }}
          >
            Главное
            <NavigateNextOutlined sx={{ width: "14px", height: "14px" }} />
          </Box>
          <Box
            onClick={() => navigate("/employees")}
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            color={"#00000066"}
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "#625bff",
              },
            }}
          >
            Все сотрудники
            <NavigateNextOutlined sx={{ width: "14px", height: "14px" }} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            sx={{
              cursor: "pointer",
            }}
          >
            Новый сотрудник
          </Box>
        </Box>
      </Container>
    );
  };

  return (
    <Box display={"grid"} gap={"10px"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        gap={"10px"}
        height={"100%"}
      >
        {renderRoutes()}
        <AddUserContainer />
      </Box>
    </Box>
  );
};

export default NewEmployeePage;
