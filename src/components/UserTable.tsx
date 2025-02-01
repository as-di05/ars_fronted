import React, { useState } from "react";
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
  TableContainer,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IUser } from "../types/types";
import CustomBtn from "./CustomBtn";
import { AddBoxOutlined } from "@mui/icons-material";

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
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUserId(id);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedUserId(null);
  };

  const handleEdit = () => {
    if (selectedUserId !== null) {
      onEdit(selectedUserId);
    }
    handleCloseMenu();
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      onDelete(selectedUserId);
    }
    handleCloseMenu();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <CustomBtn
          icon={<AddBoxOutlined fontSize={"small"} />}
          label="Новый сотрудник"
          onClick={onAdd}
        />
      </Box>
      <Divider sx={{ width: "100%", margin: "8px 0 20px 0" }} />
      <TableContainer sx={{ maxHeight: "70vh", overflow: "auto" }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
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
                  <IconButton
                    onClick={(event) => handleOpenMenu(event, user.id)}
                    sx={{ padding: "4px" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Меню с опциями */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
          Удалить
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserTable;
