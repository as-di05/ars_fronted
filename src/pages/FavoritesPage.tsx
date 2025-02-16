import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { apiRequest } from "../utils/api";
import MainCardsContainer from "../containers/MainCardsContainer";
import Container from "../containers/Container";
import { NavigateNextOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [reData, setReData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRealEstates = async ({
    filter,
    search,
    isFavorites,
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
    search?: string;
    isFavorites?: boolean;
  }) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(`filter[${key}]`, value.toString());
          }
        });
      }
      if (search) {
        queryParams.append("search", search);
      }
      if (isFavorites) {
        queryParams.append("isFavorites", "true");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRealEstates({
      filter: {},
      search: "",
      isFavorites: true,
    });
  }, []);

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
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            sx={{
              cursor: "pointer",
            }}
          >
            Избранное
          </Box>
        </Box>
      </Container>
    );
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      gap={"10px"}
      height={"100%"}
    >
      {renderRoutes()}
      <Container
        display="grid"
        alignItems="center"
        gap={2}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        <Box>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <CircularProgress />
            </Box>
          ) : reData && reData.length ? (
            <MainCardsContainer
              items={reData}
              // onIdSelected={(id) => console.log("Выбранный ID:", id)}
            />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <h2>У вас нет избранных</h2>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default FavoritesPage;
