import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#625bff",
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "14px", // Размер текста внутри поля
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#625bff",
          },
          fontSize: "14px",
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -8px) scale(0.85)", // Смещение и масштаб для лейбла
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "12px", // Размер текста в выпадающем списке
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,Arial, sans-serif",
  },
});

export default theme;
