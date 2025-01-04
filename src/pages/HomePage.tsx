import React, { useState } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import MainCardsContainer from "../containers/MainCardsContainer";
import { categoriesData, realEstateData } from "../utils/config";
import CategoriesBar from "../components/CategoriesBar";

const HomePage: React.FC = () => {
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
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      gap={"10px"}
      height={"100%"}
    >
      <Container
        sx={{
          height: "auto",
          alignItems: "start",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <CategoriesBar data={[{ id: 0, label: "Все" }, ...categoriesData]} />
      </Container>
      <Container
        display="grid"
        alignItems="center"
        gap={2}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          height: "100%",
          padding: "20px",
        }}
      >
        <Box>
          <MainCardsContainer
            filteredCards={filteredCards}
            onFieldSelected={(field) => console.log("Выбранное поле:", field)}
            onIdSelected={(id) => console.log("Выбранный ID:", id)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
