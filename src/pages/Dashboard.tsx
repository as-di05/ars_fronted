import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EmployeesPage from "./EmployeePage";
import RealEstatesPage from "./RealEstatesPage";
import NewRealEstatePage from "./NewRealEstatePage";
import FullRealEstatePage from "./FullRealEstatePage";

const Dashboard: React.FC = () => {
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
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/real-estates" element={<RealEstatesPage />} />
            <Route
              path="/real-estates/create"
              element={<NewRealEstatePage />}
            />
            <Route
              path="/real-estates/:id"
              element={<FullRealEstatePage />}
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
