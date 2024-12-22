import React from "react";
import { Box, BoxProps } from "@mui/material";

interface ContainerProps extends BoxProps {}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        padding: "16px",
        border: "1px solid #e0e0e0",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
