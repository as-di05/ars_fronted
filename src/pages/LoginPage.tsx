import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiRequest } from "../utils/api";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!login || !password) {
      setErrorMessage("Заполните все поля!");
      return;
    }
    try {
      const response = await apiRequest<{ access_token: string }>(
        "POST",
        "/auth/login",
        { login, password }
      );
      setErrorMessage(null);
      if (!response?.access_token) {
        setErrorMessage("Ошибка авторизаци!");
        return null;
      }
      localStorage.setItem("jwt", response.access_token);
      window.location.href = "/";
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error && error?.statusCode === 401) {
        setErrorMessage("Неправильный логин или пароль!");
      } else {
        setErrorMessage("Ошибка авторизаци!");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f7f9fc"
      px={2}
    >
      <Box
        width="100%"
        maxWidth="400px"
        mt={-8}
        mb={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography
          variant="h4"
          color="#625bff"
          fontWeight="bold"
          sx={{ fontSize: "24px" }}
        >
          TURAN CRM
        </Typography>
        <Typography color="gray" fontSize="14px" mt={0.5}>
          Агентство недвижимости
        </Typography>
      </Box>
      <Box
        bgcolor="white"
        p={4}
        borderRadius="8px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        width="100%"
        maxWidth="400px"
      >
        <Typography
          variant="h6"
          textAlign="center"
          color="#625bff"
          fontWeight="bold"
          mb={3}
        >
          Войти в систему
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mb: 1 }}
            >
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "#625bff",
              "&:hover": { backgroundColor: "#4a44c5" },
            }}
            onClick={handleLogin}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
