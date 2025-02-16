import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Divider,
} from "@mui/material";
import { ICustomer } from "../types/types";
import { LocationOnRounded } from "@mui/icons-material";
import { ReStatusObj } from "../utils/config";
import UserCard from "./UserCard";
import { NavigateFunction } from "react-router-dom";

interface CustomerCardProps {
  card: ICustomer;
  navigate: NavigateFunction;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ card, navigate }) => {
  const renderStatusIcon = (statusId: number) => {
    if (!ReStatusObj[statusId]) {
      return null;
    }
    return (
      <Box
        sx={{
          width: "min-content",
          maxHeight: "210px",
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
      onClick={(e) => {
        // if ((e.target as HTMLElement).closest(".favorite-button") === null) {
        //   navigate(`/customers/${card.id}`);
        // }
        // e.stopPropagation();
      }}
      sx={{
        minHeight: "160px",
        maxHeight: "200px",
        display: "grid",
        gridTemplateColumns: "100%",
        justifyContent: "start",
        boxShadow: 3,
        borderRadius: "8px",
        height: "100%",
      }}
    >
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
              <span>№ {card.id}</span>
              {" - "}
              {card.category.label}
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
                      {card.prices[0].startPrice}
                      {card.prices[0].startPrice && card.prices[0].currency}
                      {card.prices[0].endPrice &&
                        ` - ${card.prices[0].endPrice}${card.prices[0].currency}`}
                    </Typography>
                  </Box>
                }
              </Box>
            )}
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              variant="body2"
              fontSize={14}
              fontWeight={500}
              color="grey"
            >
              {card.customerName}
            </Typography>
          </Box>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          mt={"5px"}
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
                {card.district?.label}
              </Typography>
            </Box>
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
                WebkitLineClamp: 3,
              }}
            >
              {!card.description || card.description === "null"
                ? card.description
                : null}
            </Typography>
          </Box>
          <Box height={"100%"} display={"flex"} alignItems={"flex-end"} gap={1}>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              {renderStatusIcon(card.idStatus)}
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={0.5}>
              <UserCard
                avatarUrl={card.employee.avatarUrl}
                lastName={card.employee.lastName}
                firstName={card.employee.firstName}
              />
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
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
