import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { IUser } from "../types/types";

interface UserProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  phone?: string;
  inFull?: boolean;
  size?: "small" | "big";
  bgcolor?: string;
  color?: string;
}

const UserCard: React.FC<UserProps> = ({
  firstName,
  lastName,
  avatarUrl,
  bgcolor,
  color,
  phone,
  inFull,
  size,
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
    <Box display="flex" alignItems="center" gap={size === "big" ? 2 : 1}>
      <Avatar
        src={avatarUrl ? avatarUrl : undefined}
        sx={{
          bgcolor: bgcolor ? bgcolor : "#625bff",
          color: color ? color : "#fff",
          width: size === "big" ? "36px" : "28px",
          height: size === "big" ? "36px" : "28px",
          fontSize: size === "big" ? "20px" : "16px",
        }}
      >
        {handleUserName(firstName, lastName)}
      </Avatar>
      {inFull === true && (
        <Box display={"grid"}>
          <Box fontSize={size === "big" ? 16 : 13} fontWeight={"500"}>
            {lastName} {firstName}
          </Box>
          {phone && (
            <Box fontSize={size === "big" ? 14 : 10} color={"#7c7c7c"}>
              {phone}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserCard;
