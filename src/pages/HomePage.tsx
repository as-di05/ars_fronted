import React, { useEffect, useState } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import MainCardsContainer from "../containers/MainCardsContainer";
import { categoriesData } from "../utils/config";
import CategoriesBar from "../components/CategoriesBar";
import { apiRequest } from "../utils/api";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string>("");
  const [reData, setReData] = useState<any[]>([]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleFieldSorting = (field: string) => {
    setSortField(field);
  };

  const getRealEstates = async ({
    categoryId,
    sortColumn,
  }: {
    categoryId?: number | null;
    sortColumn?: string;
  }) => {
    try {
      let query = "";

      query += categoryId ? `categoryId=${categoryId}` : "";
      query += sortColumn
        ? `${query.length ? "&" : ""}sortColumn=${sortColumn}`
        : "";

      const response = await apiRequest("GET", `/real-estate?${query}`);
      if (Array.isArray(response) && response.length) {
        setReData(response);
      } else {
        setReData([]);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (selectedCategory === null && !sortField?.length) {
      getRealEstates({});
    } else {
      getRealEstates({ categoryId: selectedCategory, sortColumn: sortField });
    }
  }, [selectedCategory, sortField]);

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
        <CategoriesBar
          data={[{ id: 0, label: "Все" }, ...categoriesData]}
          handleSelect={handleSelectCategory}
        />
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
            items={reData}
            onFieldSelected={handleFieldSorting}
            onIdSelected={(id) => console.log("Выбранный ID:", id)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
