import React, { useState } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon, FilterAlt } from "@mui/icons-material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  availableFilters: string[]; 
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Поиск...",
  availableFilters,
}) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
    handleCloseMenu();
  };

  const handleDeleteFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  return (
    <Box sx={{ width: "100%", height: '80px' }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            padding: "3px 6px",
            boxShadow: "0px 1.5px 3px rgba(0, 0, 0, 0.1)",
            flex: 1, // делает поисковую строку растягивающейся
          }}
        >
          <InputBase
            placeholder={placeholder}
            sx={{
              flex: 1,
              paddingLeft: "8px",
              fontSize: "16px",
              color: "#424242",
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <IconButton
            sx={{
              color: "#625bff",
              "&:hover": {
                backgroundColor: "rgba(98, 91, 255, 0.1)",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <IconButton
          sx={{
            color: "#625bff",
            background: "none",
            "&:hover": {
              background: "none",
            },
            borderRadius: "2px",
            fontSize: "20px",
            width: "48px",
            height: "48px",
          }}
          onClick={handleOpenMenu}
        >
          <FilterAlt sx={{ width: "28px", height: "28px" }} />
        </IconButton>
      </Box>
      {filters.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {filters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => handleDeleteFilter(filter)}
              sx={{
                backgroundColor: "#635bff5c",
                "& .MuiChip-deleteIcon": {
                  color: "#424242a7",
                  fontSize: "16px",
                },
                height: '24px',
                padding: '0',
                color: "#625bff",
                fontWeight: "500",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
          ))}
        </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {availableFilters.map((filter) => (
          <MenuItem key={filter} onClick={() => handleAddFilter(filter)}>
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SearchBar;
