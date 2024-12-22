// SearchWithFilter.tsx
import React, { useState } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import MainCardsContainer from "../containers/MainCardsContainer";
import { realEstateData } from "../utils/config";

const SearchWithFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Все");

  const filterOptions = ["Все", "Активные", "Завершенные"];
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredCards = realEstateData.filter(
    (card) =>
      filter === "Все" ||
      (card.id === 1 && filter === "Активные") ||
      (card.id === 2 && filter === "Завершенные")
  );

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
      <Box>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          availableFilters={filterOptions}
        />
        <Divider sx={{ width: "100%", margin: "8px 0 10px 0" }} />
        <MainCardsContainer
          filteredCards={filteredCards}
          onFieldSelected={(field) => console.log("Выбранное поле:", field)}
          onIdSelected={(id) => console.log("Выбранный ID:", id)}
        />
      </Box>
    </Container>
  );
};

export default SearchWithFilter;
