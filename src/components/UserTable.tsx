import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUser } from "../types/types";
import CustomBtn from "./CustomBtn";
import { AddBoxOutlined } from "@mui/icons-material";
import { baseUrl } from "../utils/consts";

interface UserTableProps {
  users: IUser[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Box
          display={"flex"}
          justifyContent={"end"}
          sx={{ cursor: "pointer" }}
          margin={"5px 0"}
        >
          <CustomBtn
            icon={<AddBoxOutlined fontSize={"small"} />}
            label="Новый сотрудник"
            onClick={onAdd}
          />
        </Box>
      </Box>
      <Divider sx={{ width: "100%", margin: "8px 0 20px 0" }} />
      <Table sx={{ minWidth: 650, borderRadius: "8px" }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Аватар</TableCell>
            <TableCell>Логин</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Номер телефона</TableCell>
            <TableCell align="center">Роль</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Typography variant="body2">{index + 1}</Typography>
              </TableCell>
              <TableCell>
                <Avatar
                  src={user.avatarUrl ?? undefined}
                  sx={{
                    bgcolor: user.avatarUrl ? "transparent" : "#625bff",
                    color: "white",
                    width: 32,
                    height: 32,
                    fontSize: 14,
                  }}
                >
                  {!user.avatarUrl && user.firstName[0]?.toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontSize={14}>
                  {user.login}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontSize={14}>
                  {user.firstName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontSize={14}>
                  {user.lastName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontSize={14}>
                  {user.phoneNumber}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  fontSize={12}
                  align="center"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  {user.role && user.role.label}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box display="flex" gap={0.5} justifyContent="center">
                  {/* <IconButton
                    onClick={() => onEdit(user.id)}
                    color="primary"
                    sx={{ padding: "4px" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton> */}
                  <IconButton
                    onClick={() => onDelete(user.id)}
                    color="error"
                    sx={{ padding: "4px" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserTable;
