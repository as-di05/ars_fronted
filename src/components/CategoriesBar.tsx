import React, { useEffect, useState } from "react";
import {
  ApartmentOutlined,
  ApartmentRounded,
  AssuredWorkloadOutlined,
  AssuredWorkloadRounded,
  ClearAllOutlined,
  ClearAllRounded,
  HomeOutlined,
  HomeRounded,
  MapOutlined,
  MapRounded,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface CategoriesBarProps {
  data: any[];
  activeId?: number;
}

const categoryIcons: { [key: string]: any } = {
  0: {
    outlined: <ClearAllOutlined sx={{ width: "18px", height: "18px" }} />,
    filled: <ClearAllRounded sx={{ width: "18px", height: "18px" }} />,
  },
  1: {
    outlined: <ApartmentOutlined sx={{ width: "18px", height: "18px" }} />,
    filled: <ApartmentRounded sx={{ width: "18px", height: "18px" }} />,
  },
  2: {
    outlined: <HomeOutlined sx={{ width: "18px", height: "18px" }} />,
    filled: <HomeRounded sx={{ width: "18px", height: "18px" }} />,
  },
  3: {
    outlined: <MapOutlined sx={{ width: "18px", height: "18px" }} />,
    filled: <MapRounded sx={{ width: "18px", height: "18px" }} />,
  },
  4: {
    outlined: <AssuredWorkloadOutlined fontSize="small" />,
    filled: <AssuredWorkloadRounded fontSize="small" />,
  },
};

const CategoriesBar: React.FC<CategoriesBarProps> = ({ data, activeId }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  useEffect(() => {
    if (activeId) {
      setActiveCategory(activeId);
    }
  }, [activeId]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${data.length || 1}, 1fr)`}
      gap="20px"
    >
      {data.map((item) => {
        const isActive = activeCategory === item.id;
        return (
          <Box
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            display="flex"
            flexDirection="column"
            alignItems="start"
            padding="12px 20px"
            border={`.5px solid ${isActive ? "#625bff" : "#dfdfdf"}`}
            borderRadius="4px"
            bgcolor={isActive ? "#635bff12" : "#f8f8f8"}
            gap="5px"
            sx={{ cursor: "pointer" }}
            color={isActive ? "#625bff" : "inherit"}
          >
            <Box
              display="flex"
              padding="5px"
              bgcolor="#fff"
              border="0.2px solid #dfdfdf"
              borderRadius="2px"
            >
              {isActive
                ? categoryIcons[item.id].filled
                : categoryIcons[item.id].outlined}
            </Box>
            <Typography fontSize="12px" color="#000" whiteSpace="nowrap">
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoriesBar;
