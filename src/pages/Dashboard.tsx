// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EmployeesPage from "./EmployeePage";
import RealEstatesPage from "./RealEstatesPage";
import NewRealEstatePage from "./NewRealEstatePage";
import FullRealEstatePage from "./FullRealEstatePage";
import { userFetchProperties } from "../features/users/currentUserActions";
import { useAppDispatch } from "../hooks/hooks";
import SearchPage from "./SearchPage";
import NewEmployeePage from "./NewEmployeePage";
import FavoritesPage from "./FavoritesPage";
import { districtsProperties } from "../features/districts/districtsActions";
import { dealTypesProperties } from "../features/dealTypes/dealTypesActions";
import { reHeatingsProperties } from "../features/reHeatings/reHeatingsActions";
import { reSeriesProperties } from "../features/reSeries/reSeriesActions";
import { documentsProperties } from "../features/reDocuments/documentsActions";
import { wallMaterialsProperties } from "../features/wallMaterials/wallMaterialsActions";
import EditEmployeePage from "./EditEmployeePage";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userFetchProperties());
    dispatch(districtsProperties());
    dispatch(dealTypesProperties());
    dispatch(reSeriesProperties());
    dispatch(reHeatingsProperties());
    dispatch(documentsProperties());
    dispatch(wallMaterialsProperties());
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        display={"grid"}
        gridTemplateColumns={"20vw auto"}
        width="100%"
        height="calc(100vh - 60px)"
        overflow="auto"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #e0e0e0",
            height: "100%",
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            padding: "16px",
            height: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/create" element={<NewEmployeePage />} />
            <Route path="/employees/:id" element={<EditEmployeePage />} />
            <Route path="/real-estates" element={<RealEstatesPage />} />
            <Route
              path="/real-estates/create"
              element={<NewRealEstatePage />}
            />
            <Route path="/real-estates/:id" element={<FullRealEstatePage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
