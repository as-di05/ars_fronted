import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { FilterAltOutlined } from "@mui/icons-material";

interface FilterProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: string) => {
    setActiveFilter(option);
    onSelect(option);
    handleClose();
  };

  return (
    <Box height={'48px'}>
      <Button
        variant="contained"
        startIcon={<FilterAltOutlined />}
        onClick={handleClick}
        sx={{
          backgroundColor: activeFilter ? "#1976d2" : "#e0e0e0",
          color: activeFilter ? "#fff" : "#000",
          ":hover": { backgroundColor: activeFilter ? "#1565c0" : "#d6d6d6" },
        }}
      >
        {activeFilter || "Фильтр"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Filter;
