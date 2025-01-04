import React from "react";
import { Box } from "@mui/material";

interface FilterProps {
  icon?: React.ReactNode;
  label: string;
  onClick: (value?: any) => void;
}

const CustomBtn: React.FC<FilterProps> = ({ icon, label, onClick }) => {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={1}
      fontSize={14}
      color={"#fff"}
      bgcolor={"#625bff"}
      border={"1px solid #625bff"}
      padding={"6px 10px"}
      borderRadius={"4px"}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#5046cc",
        },
      }}
    >
      {icon && icon}
      {label}
    </Box>
  );
};

export default CustomBtn;
