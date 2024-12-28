import React, { useState } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import UserTable from "../components/UserTable";
import { usersData } from "../utils/config";

const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = ["Все", "Активные", "Завершенные"];
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
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          availableFilters={filterOptions}
        />
        <Divider sx={{ width: "100%", margin: "8px 0 20px 0" }} />
        <UserTable
          onAdd={handleAdd}
          users={usersData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
};

export default EmployeesPage;
