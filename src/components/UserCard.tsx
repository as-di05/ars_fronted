import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { IUser } from "../types/types";

interface UserProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  onToggleFavorite?: () => any;
}

const UserCard: React.FC<UserProps> = ({
  firstName,
  lastName,
  avatarUrl,
  onToggleFavorite,
}) => {
  const handleUserName = (lastName: any, firstName: any) => {
    if (!firstName && !lastName) {
      return "";
    }
    return `${lastName && lastName[0]?.toUpperCase()}${
      firstName && firstName[0]?.toUpperCase()
    }`;
  };

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Avatar
        src={avatarUrl ? avatarUrl : undefined}
        sx={{
          bgcolor: false ? "transparent" : "#625bff",
          color: "white",
          width: "28px",
          height: "28px",
          fontSize: '16px'
        }}
      >
        {handleUserName(firstName, lastName)}
      </Avatar>
    </Box>
  );
};

export default UserCard;
