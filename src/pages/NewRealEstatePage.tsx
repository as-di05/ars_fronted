import React, { useState } from "react";
import { Box } from "@mui/material";
import Container from "../containers/Container";
import { useNavigate } from "react-router-dom";
import { NavigateNextOutlined } from "@mui/icons-material";
import AddRealEstateContainer from "../containers/AddRealEstateContainer";

const NewRealEstatePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

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
            onClick={() => navigate("/real-estates")}
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
            Все объекты
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
            Новый объект
          </Box>
        </Box>
      </Container>
    );
  };

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"70% 30%"}
      gap={"10px"}
      height={"100%"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        gap={"10px"}
        height={"100%"}
      >
        {renderRoutes()}
        <AddRealEstateContainer />
      </Box>
      <Container
        sx={{
          height: "auto",
          alignItems: "start",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <Box fontSize={"14px"}>Совпавшие объекты:</Box>
      </Container>
    </Box>
  );
};

export default NewRealEstatePage;
