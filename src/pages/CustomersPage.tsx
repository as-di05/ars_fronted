import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import MainCustomersContainer from "../containers/MainCustomersContainer";
import { categoriesData } from "../utils/config";
import CategoriesBar from "../components/CategoriesBar";
import { AddBoxOutlined } from "@mui/icons-material";
import CustomBtn from "../components/CustomBtn";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string>("");
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddNew = () => {
    navigate("/customers/create");
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleFieldSorting = (field: string) => {
    setSortField(field);
  };

  const getCustomers = async ({
    filter,
    sortColumn,
  }: {
    filter?: {
      categoryId?: number | null;
      customerName?: string;
      customerPhone?: string;
      districtId?: number;
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
      const response = await apiRequest("GET", `/customers?${queryString}`);
      if (Array.isArray(response) && response.length) {
        setCustomersData(response);
      } else {
        setCustomersData([]);
      }
    } catch (e) {
      console.error("Error fetching customers:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === null && !sortField?.length) {
      getCustomers({});
    } else {
      getCustomers({
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
              label="Новый покупатель"
              onClick={handleAddNew}
            />
          </Box>
          <Divider
            sx={{
              width: "100%",
              margin: "14px 0",
            }}
          />
          <MainCustomersContainer
            containerHeight="calc(90vh - 270px)"
            items={customersData}
            onFieldSelected={handleFieldSorting}
            loading={loading}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CustomersPage;
