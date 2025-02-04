import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Container from "../containers/Container";
import MainCardsContainer from "../containers/MainCardsContainer";
import { categoriesData } from "../utils/config";
import CategoriesBar from "../components/CategoriesBar";
import { apiRequest } from "../utils/api";

const HomePage: React.FC = () => {
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
    filter,
    sortColumn,
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
    sortColumn?: string;
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
      if (sortColumn) {
        queryParams.append("sortColumn", sortColumn);
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

  useEffect(() => {
    if (selectedCategory === null && !sortField?.length) {
      getRealEstates({});
    } else {
      getRealEstates({
        filter: { categoryId: selectedCategory },
        sortColumn: sortField,
      });
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
            // onIdSelected={(id) => console.log("Выбранный ID:", id)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
