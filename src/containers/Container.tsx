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
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
      }}
      height={props.height ? props.height : "100%"}
      padding={props.padding ? props.padding : "16px"}
    >
      {children}
    </Box>
  );
};

export default Container;
