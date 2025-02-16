import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import MainCardsContainer from "../containers/MainCardsContainer";
import { categoriesData } from "../utils/config";
import CategoriesBar from "../components/CategoriesBar";
import { AddBoxOutlined } from "@mui/icons-material";
import CustomBtn from "../components/CustomBtn";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

const RealEstatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string>("");
  const [reData, setReData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddNew = () => {
    navigate("/real-estates/create");
  };

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
      if (sortColumn) {
        queryParams.append("sortColumn", sortColumn);
      }
      queryParams.append("onlyMy", "true");

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
          <Box
            display={"flex"}
            justifyContent={"end"}
            sx={{ cursor: "pointer" }}
            margin={"5px 0"}
          >
            <CustomBtn
              icon={<AddBoxOutlined fontSize={"small"} />}
              label="Новый объект"
              onClick={handleAddNew}
            />
          </Box>
          <Divider
            sx={{
              width: "100%",
              margin: "14px 0",
            }}
          />
          <MainCardsContainer
            containerHeight="calc(90vh - 270px)"
            items={reData}
            onFieldSelected={handleFieldSorting}
            loading={loading}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RealEstatesPage;
