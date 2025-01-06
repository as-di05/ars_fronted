import React, { useState } from "react";
import { Box } from "@mui/material";
import Container from "../containers/Container";
import { NavigateNextOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import FullRealEstateView from "../components/FullRealEstateView";

const FullRealEstatePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const renderRoutes = () => {
    return (
      <Container
        sx={{
          alignItems: "start",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
        padding={"8px 16px"}
        height={"auto"}
      >
        <Box fontSize={"12px"} display={"flex"} alignItems={"center"}>
          <Box
            onClick={() => navigate("/")}
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            color={"#00000066"}
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "#625bff",
              },
            }}
          >
            Главное
            <NavigateNextOutlined sx={{ width: "14px", height: "14px" }} />
          </Box>
          <Box
            onClick={() => navigate(-1)}
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            color={"#00000066"}
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "#625bff",
              },
            }}
          >
            Все объекты
            <NavigateNextOutlined sx={{ width: "14px", height: "14px" }} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={0.2}
            sx={{
              cursor: "pointer",
            }}
          >
            Объект ID:{1}
          </Box>
        </Box>
      </Container>
    );
  };

  return (
    <Box display={"grid"} gap={"10px"} height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        gap={"10px"}
        height={"100%"}
      >
        {renderRoutes()}
        <FullRealEstateView
          data={{
            id: 5,
            idFloor: 8,
            idSeries: 1,
            category: {
              id: 1,
              label: "Квартира",
            },
            employee: {
              id: 1,
              avatarUrl:
                "https://img.tapimg.net/market/images/1cf93eb96436b0740f38d749f31c0ccc.jpg",
              phone: "996500005535",
              roleId: 1,
              lastName: "Ulukbekov",
              firstName: "Adilet",
            },
            dealType: {
              id: 1,
              label: "Наличный расчет",
            },
            idRoom: 5,
            idWallMaterial: 1,
            ownerPhone: "996500005535",
            ownerName: "Улукбеков Адилет",
            idStatus: 2,
            statusUpdatedAt: "2024-12-23T07:33:10.000Z",
            createdAt: "2024-12-23T07:33:10.000Z",
            updatedAt: "2024-12-23T07:33:10.000Z",
            area: 59,
            district: "Филармония",
            description:
              "Сдача под ПСО назначена на 1 квартал 2025 года./n \n Есть центральное отопление. Тихий район",
            documents: [
              {
                id: 1,
                label: "Договор купли-продажи",
              },
              {
                id: 3,
                label: "Генеральная доверенность",
              },
            ],
            images: [
              "https://rent.brookfieldproperties.com/wp-content/uploads/2024/05/Atelier-PH7-08_Web.jpg",
              "https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg",
              "https://rent.brookfieldproperties.com/wp-content/uploads/2024/05/Atelier-PH7-08_Web.jpg",
              "https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg",
              "https://rent.brookfieldproperties.com/wp-content/uploads/2024/05/Atelier-PH7-08_Web.jpg",
              "https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg",
            ],
            prices: [
              {
                id: 5,
                currency: "USD",
                createdAt: "2024-12-23 13:33:10.000000",
                updatedAt: "2024-12-23 13:33:10.000000",
                ownerPrice: 100000,
                objectPrice: 120000,
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default FullRealEstatePage;
