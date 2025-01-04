import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Box,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IRealEstate } from "../types/types";
import IconContainer from "../containers/IconContainer";
import {
  ConstructionRounded,
  CreditScoreRounded,
  CropFreeTwoTone,
  LocationOnRounded,
  MeetingRoomRounded,
  StairsRounded,
  TaskRounded,
} from "@mui/icons-material";
import { FloorsObj, IdTypeObj, ReStatusObj, RoomsObj } from "../utils/config";
import UserCard from "./UserCard";

interface RealEstateCardProps {
  card: IRealEstate;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({ card }) => {
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
          padding: "3px 14px",
          borderRadius: "6px",
          gap: "3px",
        }}
      >
        <Typography
          variant="body2"
          fontSize={13}
          fontWeight={"500"}
          noWrap
          color={ReStatusObj[statusId].color}
        >
          {ReStatusObj[statusId].label}
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: "20% 80%",
        justifyContent: "start",
        boxShadow: 3,
        borderRadius: "8px",
        height: "100%",
      }}
    >
      <Box width={"100%"} height={"100%"}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px 0 0 8px",
          }}
          image={card?.image || "https://via.placeholder.com/150"}
          alt={card.description}
        />
      </Box>
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "12px 16px",
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body2" fontSize={14} fontWeight={600}>
              <span>{card.id}</span>
              {" - "}
              {card.category.label}
            </Typography>
            <Typography variant="body2" fontSize={"12px"}>
              {card.ownerName}
            </Typography>
          </Box>
          <Box>
            {card.prices && card.prices.length > 0 && (
              <Box>
                {
                  <Box
                    key={card.prices[0].id}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      fontWeight={"600"}
                      fontSize={"15px"}
                      color="#625bff"
                    >
                      {card.prices[0].objectPrice}
                      {card.prices[0].objectPrice && card.prices[0].currency}
                      <span style={{ fontWeight: "400", color: "#0009" }}>
                        {card.prices[0].ownerPrice &&
                          ` / ${card.prices[0].ownerPrice}${card.prices[0].currency}`}
                      </span>
                    </Typography>
                  </Box>
                }
              </Box>
            )}
          </Box>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          mt={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Box display={"grid"}>
            <Box display={"flex"} alignItems={"center"} gap={0.5}>
              <LocationOnRounded
                sx={{ width: "12px", height: "12px", color: "#78a7fe" }}
              />
              <Typography variant="body2" color="#78a7fe" fontSize={"12px"}>
                {card.district}
              </Typography>
            </Box>
            {card.dealType && (
              <Box display={"flex"} alignItems={"center"} gap={0.5}>
                <CreditScoreRounded
                  sx={{ width: "12px", height: "12px", color: "#78a7fe" }}
                />
                <Typography variant="body2" color="#78a7fe" fontSize={"12px"}>
                  {card.dealType.label}
                </Typography>
              </Box>
            )}
            <Typography
              width={"100%"}
              variant="body2"
              color="textSecondary"
              marginTop="5px"
              fontSize="12px"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
              }}
            >
              {card.description}
            </Typography>
          </Box>
          <Box height={"100%"} display={"flex"} alignItems={"flex-end"}>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              {renderStatusIcon(card.idStatus)}
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            width: "100%",
            margin: "10px 0",
            borderBottomWidth: "unset",
          }}
        />
        <Box
          display={"flex"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} gap={0.5}>
            {card?.area && (
              <IconContainer
                icon={CropFreeTwoTone}
                text={`${card.area}m²`}
                backgroundColor="#e0ebff"
              />
            )}
            {card?.idFloor && (
              <IconContainer
                icon={StairsRounded}
                text={FloorsObj[card.idFloor].label ?? ""}
                backgroundColor="#e0ebff"
              />
            )}
            {card?.idRoom && (
              <IconContainer
                icon={MeetingRoomRounded}
                text={RoomsObj[card.idRoom].label ?? ""}
                backgroundColor="#e0ebff"
              />
            )}
            {card?.idWallMaterial && (
              <IconContainer
                icon={ConstructionRounded}
                text={card?.idWallMaterial === 1 ? "Кирпич" : "Панель"}
                backgroundColor="#e0ebff"
              />
            )}
            {card?.documents && (
              <IconContainer
                icon={TaskRounded}
                text={card?.documents[0].label}
                backgroundColor="#e0ebff"
              />
            )}
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={0.5}>
            <IconButton
              onClick={() => console.log(1)}
              color={true ? "secondary" : "default"}
              sx={{
                backgroundColor: "none",
              }}
            >
              {card.id % 2 === 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <UserCard
              avatarUrl={card.employee.avatarUrl}
              lastName={card.employee.lastName}
              firstName={card.employee.firstName}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RealEstateCard;
