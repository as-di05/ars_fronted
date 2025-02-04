import React, { useState } from "react";
import { Box } from "@mui/material";
import Container from "../containers/Container";
import { useNavigate } from "react-router-dom";
import { NavigateNextOutlined } from "@mui/icons-material";
import AddRealEstateContainer from "../containers/AddRealEstateContainer";
import MatchedRealEstate from "../components/MatchedRealEstate";
import { apiRequest } from "../utils/api";
import { IRealEstate } from "../types/types";

const NewRealEstatePage: React.FC = () => {
  const navigate = useNavigate();
  const [reData, setReData] = useState<IRealEstate[]>([]);

  const getRealEstates = async ({
    filter,
  }: {
    filter?: {
      categoryId?: number | null;
      ownerName?: string;
      ownerPhone?: string;
      districtId?: number;
      floorId?: number;
      roomId?: number;
      seriesId?: number;
    };
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(`filter[${key}]`, value.toString());
          }
        });
      }

      const queryString = queryParams.toString();
      const response = await apiRequest("GET", `/real-estate?${queryString}`);
      if (Array.isArray(response) && response.length) {
        setReData(response);
      } else {
        setReData([]);
      }
    } catch (e) {
      console.error("Error fetching real estates:", e);
    }
  };

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
        <AddRealEstateContainer getRealEstates={getRealEstates} />
      </Box>
      <Container
        sx={{
          height: "auto",
          alignItems: "start",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
        display={"grid"}
        gap={"10px"}
      >
        <Box fontSize={"14px"}>Совпавшие объекты:</Box>
        <MatchedRealEstate items={reData} />
      </Container>
    </Box>
  );
};

export default NewRealEstatePage;
