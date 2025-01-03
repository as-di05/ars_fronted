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
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IUser } from "../types/types";

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
      {/* Кнопка добавления */}
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{
            bgcolor: " #78a7fe",
            textTransform: "none",
            fontWeight: 500,
            fontSize: 14,
            padding: "6px 16px",
          }}
        >
          Новый сотрудник
        </Button>
      </Box>

      {/* Таблица */}
      <Table sx={{ minWidth: 650, borderRadius: "8px" }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Аватар</TableCell>
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
                  src={user.avatarUrl || undefined}
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
                  {user.phone}
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
                  <IconButton
                    onClick={() => onEdit(user.id)}
                    color="primary"
                    sx={{ padding: "4px" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
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
