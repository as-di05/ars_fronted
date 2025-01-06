import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Container from "../containers/Container";
import MainCardsContainer from "../containers/MainCardsContainer";
import { categoriesData, realEstateData } from "../utils/config";
import CategoriesBar from "../components/CategoriesBar";
import { AddBoxOutlined } from "@mui/icons-material";
import CustomBtn from "../components/CustomBtn";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

const RealEstatesPage: React.FC = () => {
  const [filter, setFilter] = useState("Все");
  const navigate = useNavigate(); 

  const filteredCards = realEstateData.filter(
    (card) =>
      filter === "Все" ||
      (card.id === 1 && filter === "Активные") ||
      (card.id === 2 && filter === "Завершенные")
  );

  const handleAddNew = () => {
    navigate("/real-estates/create");
  };

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
            filteredCards={filteredCards}
            onFieldSelected={(field) => console.log("Выбранное поле:", field)}
            onIdSelected={(id) => console.log("Выбранный ID:", id)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RealEstatesPage;
