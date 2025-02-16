import React, { useState } from "react";
import {
  Box,
  IconButton,
  Grid2,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CustomerCard from "../components/CustomerCard";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { ICustomer } from "../types/types";
import { useNavigate } from "react-router-dom";

interface MainCustomersContainerProps {
  items: ICustomer[];
  onFieldSelected?: (field: string) => void;
  onIdSelected?: (id: number) => void;
  containerHeight?: string;
  loading?: boolean;
}
const sortOptions = [
  { id: "created", label: "Новые" },
  { id: "lastUpdated", label: "Измененные" },
];

const MainCustomersContainer: React.FC<MainCustomersContainerProps> = ({
  items,
  onFieldSelected,
  onIdSelected,
  containerHeight,
  loading,
}) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSort = (key: string) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    handleCloseMenu();
    if (onFieldSelected) {
      onFieldSelected(key);
    }
  };

  const handleCardClick = (id: number) => {
    if (onIdSelected) {
      onIdSelected(id);
    }
  };

  return (
    <Box display="grid" gap={0.5}>
      {!onFieldSelected ? null : (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="end"
          gap={2}
          height={"35px"}
        >
          <Box display={"flex"} gap={1} alignItems={"center"} height={"24px"}>
            <Box color={"#ccc"} fontSize={"12px"} fontWeight={"500"}>
              Сортировка:{" "}
            </Box>
            <IconButton
              onClick={handleOpenMenu}
              sx={{
                background: "none",
                "&:hover": {
                  background: "none",
                },
                borderRadius: "0",
                display: "flex",
                justifyContent: "end",
                gap: "5px",
                height: "24px",
                padding: 0,
              }}
            >
              <Typography fontSize={"13px"} fontWeight={"600"}>
                {sortBy
                  ? sortOptions.find((option) => option.id === sortBy)?.label
                  : "По умолчанию"}
              </Typography>
              <Box display={"grid"}>
                <KeyboardArrowUp
                  sx={{
                    fontSize: "16px",
                    marginBottom: "-4px",
                    color: sortOrder === "asc" ? "625bff" : "#ccc",
                  }}
                />
                <KeyboardArrowDown
                  sx={{
                    fontSize: "16px",
                    marginTop: "-4px",
                    color: sortOrder === "desc" ? "625bff" : "#ccc",
                  }}
                />
              </Box>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.id}
                onClick={
                  !onFieldSelected ? () => null : () => handleSort(option.id)
                }
              >
                {option.label}
                {sortBy === option.id &&
                  (sortOrder === "asc" ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  ))}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
      <Box
        height={
          containerHeight
            ? containerHeight
            : `calc(90vh - ${!onFieldSelected ? "110px" : "215px"})`
        }
        sx={{ overflowY: "auto" }}
      >
        <Grid2
          container
          spacing={3}
          sx={{ display: "grid", padding: "15px 5px" }}
        >
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={"50vh"}
            >
              <CircularProgress />
            </Box>
          ) : (
            items.map((card) => (
              <Grid2 key={card.id}>
                <div
                  onClick={() => handleCardClick(card.id)}
                  style={{ maxHeight: "210px" }}
                >
                  <CustomerCard card={card} navigate={navigate} />
                </div>
              </Grid2>
            ))
          )}
        </Grid2>
      </Box>
    </Box>
  );
};

export default MainCustomersContainer;
