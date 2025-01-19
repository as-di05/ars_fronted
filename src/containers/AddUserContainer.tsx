import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  MenuItem,
} from "@mui/material";
import { apiRequest } from "../utils/api";
import Container from "./Container";
import { Avatar } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CustomBtn from "../components/CustomBtn";
import { CheckOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AddUserContainer: React.FC = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState<any>({
    login: null,
    password: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    roleId: 3,
  });

  const isFormValid = (): boolean => {
    return (
      formData.login &&
      formData.password &&
      formData.password.length >= 6 &&
      formData.firstName &&
      formData.lastName &&
      formData.roleId &&
      formData.phoneNumber
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const userData = {
      login: formData.login,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      roleId: formData.roleId,
    };

    const data = new FormData();
    data.append("userData", JSON.stringify(userData));
    if (avatar) {
      data.append("avatar", avatar);
    }
    try {
      const response: any = await apiRequest("POST", "/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.status === true) {
        navigate("/employees");
      } else {
        console.error("Error:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Container
      display="grid"
      gap={2}
      gridTemplateColumns={"30% auto"}
      height={"auto"}
      alignItems="start"
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Box
        width={"100%"}
        display="grid"
        justifyContent={"center"}
        alignItems="center"
        gap={"6px"}
      >
        <Typography textAlign={"center"} fontSize={"14px"}>
          Загрузите фото
        </Typography>
        <Avatar
          alt="User Avatar"
          sx={{
            margin: "auto",
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#c4c4c4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <IconButton
              component="label"
              sx={{ height: "100%", width: "100%" }}
            >
              <PhotoCameraIcon />
              <input
                type="file"
                hidden
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </IconButton>
          )}
        </Avatar>
      </Box>
      <Box display={"grid"} gap={2}>
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          <TextField
            label="Логин"
            value={formData.login}
            name="login"
            size="small"
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Пароль"
            type="password"
            size="small"
            value={formData.password}
            name="password"
            onChange={handleFormChange}
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          <TextField
            size="small"
            label="Фамилия"
            value={formData.lastName}
            name="lastName"
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            size="small"
            label="Имя"
            value={formData.firstName}
            name="firstName"
            onChange={handleFormChange}
            fullWidth
            sx={{ height: "20px" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          <TextField
            label="Район"
            select
            fullWidth
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name="roleId"
            value={formData.roleId ?? 3}
            onChange={handleFormChange}
          >
            <MenuItem value={2} sx={{ fontSize: "14px" }}>
              Менеджер
            </MenuItem>
            <MenuItem value={3} sx={{ fontSize: "14px" }}>
              Сотрудник
            </MenuItem>
          </TextField>
          <TextField
            size="small"
            label="Номер телефона"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={handleFormChange}
            fullWidth
          />
        </Box>

        <Box display={"flex"} justifyContent={"end"} width={"100%"}>
          <CustomBtn
            icon={<CheckOutlined fontSize={"small"} />}
            label="Сохранить"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AddUserContainer;
