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
          maxHeight: "220px",
          display: "flex",
          alignItems: "center",
          backgroundColor: `${ReStatusObj[statusId].color}30`,
          padding: "5px 15px",
          borderRadius: "6px",
          gap: "3px",
        }}
      >
        <Typography
          variant="body2"
          fontSize={14}
          fontWeight={"500"}
          noWrap
          color={ReStatusObj[statusId].color}
        >
          {ReStatusObj[statusId].label}
        </Typography>
      </Box>
    );
  };

  console.log(data, "-----");
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
        <Box
          display={"grid"}
          height={"500px"}
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
                maxHeight: "500px",
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
                  height: "500px",
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
              height: "500px",
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
                  border: currentIndex === index ? "2px solid #625bff" : "none",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
            ))}
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
              <Box display="flex" gap={1}>
                {renderStatusIcon(data.idStatus)}
              </Box>
            </Box>
          </Box>
          <Box display={"grid"} gap={2}>
            <Typography fontSize={16}>Общие данные:</Typography>
            <Box margin={"0 0 0 8px"} display={"grid"} gap={1.5}>
              <Box
                display={"grid"}
                gridTemplateColumns={"136px auto"}
                gap={2}
                alignItems={"center"}
              >
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"14px"}
                  gap={0.8}
                >
                  <CropFreeTwoTone
                    sx={{ color: "#625bff", width: "14px", height: "14px" }}
                  />
                  Площадь:
                </Typography>
                <Typography fontSize={"14px"}>{data.area}m²</Typography>
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
                  fontSize={"14px"}
                  gap={0.8}
                >
                  <StairsRounded
                    sx={{ color: "#625bff", width: "14px", height: "14px" }}
                  />
                  Этажность:
                </Typography>
                <Typography fontSize={"14px"}>
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
                  fontSize={"14px"}
                  gap={0.8}
                >
                  <MeetingRoomRounded
                    sx={{ color: "#625bff", width: "14px", height: "14px" }}
                  />
                  Комнаты:
                </Typography>
                <Typography fontSize={"14px"}>
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
                  fontSize={"14px"}
                  gap={0.8}
                >
                  <ConstructionRounded
                    sx={{ color: "#625bff", width: "14px", height: "14px" }}
                  />
                  Материалы стен:{" "}
                </Typography>
                <Typography fontSize={"14px"}>
                  {data.idWallMaterial === 1 ? "Кирпич" : "Панель"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box height={"100%"} display={"flex"} alignItems={"end"}>
            <UserCard
              size="big"
              inFull={true}
              firstName={data.employee.firstName}
              lastName={data.employee.lastName}
              phone={data.employee.phone}
              avatarUrl={data.employee.avatarUrl}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FullRealEstateView;
