import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import {
  ArrowForward,
  ArrowBack,
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  CropFreeTwoTone,
  StairsRounded,
  MeetingRoomRounded,
  ConstructionRounded,
  PlaceOutlined,
  TaskRounded,
  CurrencyExchangeOutlined,
} from "@mui/icons-material";
import Container from "../containers/Container";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FloorsObj, ReStatusObj, RoomsObj } from "../utils/config";
import UserCard from "./UserCard";

interface FullRealEstateViewProps {
  data: any;
}

const FullRealEstateView: React.FC<FullRealEstateViewProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % data.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (currentIndex - 1 + data.images.length) % data.images.length
    );
  };

  const renderStatusIcon = (statusId: number) => {
    if (!ReStatusObj[statusId]) {
      return null;
    }
    return (
      <Box
        sx={{
          width: "min-content",
          display: "flex",
          alignItems: "center",
          backgroundColor: `${ReStatusObj[statusId].color}30`,
          padding: "6px 25px",
          borderRadius: "6px",
          gap: "3px",
        }}
      >
        <Typography
          variant="body2"
          fontSize={15}
          fontWeight={"500"}
          noWrap
          color={ReStatusObj[statusId].color}
        >
          {ReStatusObj[statusId].label}
        </Typography>
      </Box>
    );
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    return date
      .toLocaleString("ru-RU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(" г.", "");
  }

  return (
    <Container
      display="flex"
      flexDirection={"column"}
      alignItems="start"
      gap={1}
    >
      <Box
        display={"grid"}
        width={"100%"}
        gridTemplateColumns={"auto 28%"}
        gap={3}
      >
        <Box display={"grid"} width={"100%"} gap={1.5}>
          <Box
            display={"grid"}
            height={"400px"}
            alignItems={"start"}
            width={"100%"}
            gridTemplateColumns={"auto 20%"}
            gap={1}
          >
            <Box display={"grid"}>
              <Box
                position={"relative"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "400px",
                  overflow: "hidden",
                  border: "1px solid #625bff",
                  borderRadius: "8px",
                  background: "#e9f0fd",
                }}
              >
                <img
                  src={data.images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "contain",
                  }}
                />
                <Box
                  position={"absolute"}
                  zIndex={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    bottom: 10,
                    gap: 2,
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                >
                  <IconButton
                    onClick={handlePrev}
                    sx={{
                      color: "#fff",
                      backgroundColor: "rgba(0, 0, 0, 0.250)",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  >
                    <ArrowBackIosOutlined />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      color: "#fff",
                      backgroundColor: "rgba(0, 0, 0, 0.250)",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  >
                    <ArrowForwardIosOutlined />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              display={"grid"}
              gap={1}
              sx={{
                borderRadius: "4px",
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {data.images?.map((img: string, index: number) => (
                <img
                  key={index}
                  width={"100%"}
                  src={img}
                  alt={`Image ${index + 1}`}
                  height="100px"
                  loading="lazy"
                  onClick={() => handleImageClick(index)}
                  style={{
                    cursor: "pointer",
                    border:
                      currentIndex === index ? "2px solid #625bff" : "none",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"start"}
          >
            <Box display={"grid"}>
              <Typography variant="h4" fontSize={16} fontWeight={600}>
                {data.ownerName}{" "}
                {data.ownerPhone ? `(${data.ownerPhone})` : null}
              </Typography>
              <Typography
                fontSize={15}
                alignItems={"center"}
                display={"flex"}
                gap={0.5}
              >
                <PlaceOutlined
                  sx={{ color: "#625bff", width: "14px", height: "14px" }}
                />
                {data.district}
              </Typography>
            </Box>
            <Box display="flex">{renderStatusIcon(data.idStatus)}</Box>
          </Box>
          <Box
            height={"100%"}
            width={"100%"}
            display={"grid"}
            gridTemplateColumns={"40% auto"}
            gap={2}
          >
            <Box
              border={".5px solid #625bff"}
              borderRadius={"6px"}
              padding={"8px 10px"}
              display={"grid"}
              gap={1}
              boxShadow={"2px 3px 4px #635bff67"}
            >
              <Typography
                fontSize={14}
                fontWeight={500}
                color="#0f0f14"
                display={"flex"}
                alignItems={"center"}
                gap={0.8}
              >
                <TaskRounded
                  sx={{ width: "16px", height: "16px", color: "#625bff" }}
                />
                Документы:
              </Typography>
              <Box display={"grid"} gap={0.8}>
                {data.documents?.map((item: any) => {
                  return (
                    <Box key={item.id} fontSize={14}>
                      - {item.label}
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box
              border={".5px solid #625bff"}
              borderRadius={"6px"}
              padding={"8px 10px"}
              display={"grid"}
              gap={1}
              boxShadow={"2px 3px 4px #635bff67"}
            >
              <Typography
                fontSize={14}
                fontWeight={500}
                color="#0f0f14"
                display={"flex"}
                alignItems={"center"}
                gap={0.8}
              >
                <CurrencyExchangeOutlined
                  sx={{ width: "16px", height: "16px", color: "#625bff" }}
                />
                Цены:
              </Typography>
              <Box display={"grid"} gap={0.8}>
                {data.prices?.map((item: any) => {
                  const updatedAt = new Date(item.updatedAt);
                  const year = updatedAt.getFullYear();
                  const month = updatedAt.getMonth();
                  const day = updatedAt.getDate();
                  return (
                    <Box key={item.id}>
                      <Typography
                        fontSize={14}
                        whiteSpace={"nowrap"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        {item.objectPrice
                          ? ` - ${item.objectPrice}${item.currency}`
                          : null}
                        {item.ownerPrice
                          ? ` / ${item.ownerPrice}${item.currency} (собстветнник)`
                          : null}
                        - {formatDate(item.updatedAt)}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection={"column"} alignItems="start" gap={3}>
          <Box width={"100%"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <Typography variant="body2" fontSize={18} fontWeight={600}>
                <span>ID: {data.id}</span>
                {" - "}
                {data.category.label}
              </Typography>
              <IconButton
                onClick={() => console.log(1)}
                color={true ? "secondary" : "default"}
                size="large"
                sx={{
                  backgroundColor: "none",
                }}
              >
                {data.id % 2 === 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Box width={"100%"} display={"flex"} alignItems="start">
              {/* <Box display="flex" gap={1}>
                {renderStatusIcon(data.idStatus)}
              </Box> */}
            </Box>
          </Box>
          <Box>
            <UserCard
              size="big"
              inFull={true}
              firstName={data.employee.firstName}
              lastName={data.employee.lastName}
              phone={data.employee.phone}
              avatarUrl={data.employee.avatarUrl}
            />
          </Box>
          <Box display={"grid"} gap={1.2}>
            <Typography fontSize={15}>Общие данные:</Typography>
            <Box margin={"0 0 0 8px"} display={"grid"} gap={1.1}>
              <Box
                display={"grid"}
                gridTemplateColumns={"136px auto"}
                gap={2}
                alignItems={"center"}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"13px"}
                  gap={0.7}
                >
                  <CropFreeTwoTone
                    sx={{ color: "#625bff", width: "13px", height: "14px" }}
                  />
                  Площадь:
                </Typography>
                <Typography fontSize={"13px"}>{data.area}m²</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"136px auto"}
                gap={2}
                alignItems={"center"}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"13px"}
                  gap={0.7}
                >
                  <StairsRounded
                    sx={{ color: "#625bff", width: "13px", height: "14px" }}
                  />
                  Этажность:
                </Typography>
                <Typography fontSize={"13px"}>
                  {FloorsObj[data.idFloor].label}
                </Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"136px auto"}
                gap={2}
                alignItems={"center"}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"13px"}
                  gap={0.7}
                >
                  <MeetingRoomRounded
                    sx={{ color: "#625bff", width: "13px", height: "14px" }}
                  />
                  Комнаты:
                </Typography>
                <Typography fontSize={"13px"}>
                  {RoomsObj[data.idRoom].label}
                </Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"136px auto"}
                gap={2}
                alignItems={"center"}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"13px"}
                  gap={0.7}
                >
                  <ConstructionRounded
                    sx={{ color: "#625bff", width: "13px", height: "14px" }}
                  />
                  Материалы стен:{" "}
                </Typography>
                <Typography fontSize={"13px"}>
                  {data.idWallMaterial === 1 ? "Кирпич" : "Панель"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display={"grid"} gap={1.2}>
            <Typography fontSize={15}>Примечание:</Typography>
            <Box margin={"0 0 0 8px"} display={"grid"}>
              <Typography
                fontSize={"13px"}
                lineHeight={1.4}
                maxHeight={300}
                overflow={"scroll"}
              >
                {data.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FullRealEstateView;
