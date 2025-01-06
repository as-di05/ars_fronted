import React from "react";
import { Box, Typography } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface IconContainerProps {
  icon?: React.ComponentType<SvgIconProps>;
  text: string;
  iconColor?: string;
  backgroundColor: string;
  size?: string;
}

const IconContainer: React.FC<IconContainerProps> = ({
  icon: Icon,
  iconColor,
  text,
  backgroundColor,
  size,
}) => {
  return (
    <Box
      sx={{
        width: "min-content",
        maxWidth: "180px",
        display: "flex",
        alignItems: "center",
        backgroundColor: backgroundColor,
        padding: "2px 8px",
        borderRadius: "6px",
        gap: "5px",
      }}
    >
      {Icon && (
        <Icon
          sx={{ width: size ? size : "12px", color: iconColor ?? "#78a7fe" }}
        />
      )}
      <Typography
        variant="body2"
        fontSize={size ? size : 11}
        fontWeight={"500"}
        noWrap
        color="#78a7fe"
      >
        {text}
      </Typography>
    </Box>
  );
};

export default IconContainer;
