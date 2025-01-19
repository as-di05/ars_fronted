import React, { useEffect, useState } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import UserTable from "../components/UserTable";
import { apiRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  const handleEdit = (id: number) => {
    console.log(`Редактировать пользователя с ID ${id}`);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response: any = await apiRequest("DELETE", `/users/${userId}`);
      if (response?.status) {
        window.location.reload();
      } else {
        console.error(response?.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddNew = () => {
    navigate("/employees/create");
  };

  const getUsers = async () => {
    try {
      const response = await apiRequest("GET", "/users");
      if (Array.isArray(response) && response.length) {
        setData(response);
      } else {
        setData([]);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container
      display="grid"
      alignItems="center"
      gap={2}
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        height: "90vh",
        padding: "20px",
      }}
    >
      <Box height={"80vh"}>
        <UserTable
          onAdd={handleAddNew}
          users={data}
          onEdit={handleEdit}
          onDelete={handleDeleteUser}
        />
      </Box>
    </Container>
  );
};

export default EmployeesPage;
