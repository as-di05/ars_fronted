import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    login: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    roleId: 3,
    avatarUrl: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: any = await apiRequest("GET", `/users/${id}`);
        if (response) {
          setFormData({
            login: response.userName || "",
            firstName: response.firstName || "",
            lastName: response.lastName || "",
            phoneNumber: response.phoneNumber || "",
            roleId: response.role?.id || 3,
            avatarUrl: response.avatarUrl || "",
          });
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const isFormValid = () => {
    return (
      formData.login &&
      formData.firstName &&
      formData.lastName &&
      formData.roleId &&
      formData.phoneNumber
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response: any = await apiRequest("PUT", `/users/${id}`, {
        login: formData.login,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        roleId: formData.roleId,
      });

      if (response?.status) {
        navigate("/employees");
      } else {
        console.error("Ошибка:", response?.message || "Неизвестная ошибка");
      }
    } catch (error) {
      console.error("Ошибка обновления:", error);
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
          Обновите фото
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
      {/* <Box
        width={"100%"}
        display="grid"
        justifyContent={"center"}
        alignItems="center"
        gap={"6px"}
      >
        <Typography textAlign={"center"} fontSize={"14px"}>
          Обновите фото
        </Typography>
        <Avatar
          alt="User Avatar"
          src={avatar ? URL.createObjectURL(avatar) : formData.avatarUrl}
          sx={{ width: 120, height: 120, margin: "auto" }}
        />
        <IconButton component="label">
          <PhotoCameraIcon />
          <input
            type="file"
            hidden
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </IconButton>
      </Box> */}
      <Box display={"grid"} gap={2}>
        <TextField
          label="Логин"
          name="login"
          size="small"
          fullWidth
          value={formData.login}
          onChange={handleFormChange}
        />
        <TextField
          label="Фамилия"
          name="lastName"
          size="small"
          fullWidth
          value={formData.lastName}
          onChange={handleFormChange}
        />
        <TextField
          label="Имя"
          name="firstName"
          size="small"
          fullWidth
          value={formData.firstName}
          onChange={handleFormChange}
        />
        <TextField
          label="Роль"
          select
          fullWidth
          size="small"
          name="roleId"
          value={formData.roleId}
          onChange={handleFormChange}
        >
          <MenuItem value={2}>Менеджер</MenuItem>
          <MenuItem value={3}>Сотрудник</MenuItem>
        </TextField>
        <TextField
          label="Номер телефона"
          name="phoneNumber"
          size="small"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleFormChange}
        />
        <Box display={"flex"} justifyContent={"end"}>
          <CustomBtn
            icon={<CheckOutlined />}
            label="Сохранить"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUserContainer;
