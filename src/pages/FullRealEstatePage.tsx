import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Container from "../containers/Container";
import { NavigateNextOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import FullRealEstateView from "../components/FullRealEstateView";
import { IRealEstate } from "../types/types";
import { apiRequest } from "../utils/api";

const FullRealEstatePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IRealEstate | null>(null);

  const getRealEstate = async (id: number) => {
    try {
      const response = await apiRequest("GET", `/real-estate?id=${id}`);
      if (Array.isArray(response) && response.length) {
        setData(response[0]);
      } else {
        setData(null);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (Number(id)) {
      getRealEstate(Number(id));
    }
  }, [id]);

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
            onClick={() => navigate(-1)}
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
            Объект ID:{1}
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
        <FullRealEstateView data={data} />
      </Box>
    </Box>
  );
};

export default FullRealEstatePage;
