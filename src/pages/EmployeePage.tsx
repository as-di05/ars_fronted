import React, { useEffect, useState } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import UserTable from "../components/UserTable";
import { usersData } from "../utils/config";
import { apiRequest } from "../utils/api";

const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleEdit = (id: number) => {
    console.log(`Редактировать пользователя с ID ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Удалить пользователя с ID ${id}`);
  };

  const handleAdd = () => console.log("Добавить нового сотрудника");

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
          onAdd={handleAdd}
          users={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
};

export default EmployeesPage;
