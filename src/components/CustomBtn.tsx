import React from "react";
import { Box } from "@mui/material";

interface FilterProps {
  icon?: React.ReactNode;
  label: string;
  onClick: (value?: any) => void;
  disabled?: boolean;
}

const CustomBtn: React.FC<FilterProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(label);
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={1}
      fontSize={14}
      color={"#fff"}
      bgcolor={disabled ? "#CCC" : "#625bff"}
      border={`1px solid ${disabled ? "#CCC" : "#625bff"}`}
      padding={"6px 10px"}
      borderRadius={"4px"}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: disabled ? "#CCC" : "#5046cc",
        },
      }}
    >
      {icon && icon}
      {label}
    </Box>
  );
};

export default CustomBtn;
