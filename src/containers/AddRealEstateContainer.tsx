import React, { useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import CustomBtn from "../components/CustomBtn";
import { CheckOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import CategoriesBar from "../components/CategoriesBar";
import { categoriesData, FloorsObj, RoomsObj } from "../utils/config";
import FileUploadField from "../components/FileUploadField";
import MultiSelect from "../components/MultiSelect";

interface AddRealEstateContainerProps {}

const AddRealEstateContainer: React.FC<AddRealEstateContainerProps> = ({}) => {
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <Container
      display="flex"
      flexDirection={"column"}
      alignItems="start"
      gap={1}
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Box
        display="flex"
        height="calc(100vh - 205px)"
        flexDirection={"column"}
        alignItems="start"
        overflow={"scroll"}
        gap={5}
      >
        <Box display={"grid"} gap={1.4} fontSize={"14px"}>
          Выберите категорию:
          <CategoriesBar data={categoriesData} />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} width="100%">
          <TextField
            label="ФИО клиента"
            placeholder="Асанов Эсен А..."
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Номер клиента"
            placeholder="05000055..."
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} width="100%">
          <TextField
            label="Выберите район"
            placeholder="Тогуз-Торо..."
            select
            fullWidth
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value={1} sx={{ fontSize: "14px" }}>
              Тогуз-Торо
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: "14px" }}>
              Восток 5
            </MenuItem>
          </TextField>
          <TextField
            label="Тип сделки"
            select
            fullWidth
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              fontSize: "14px",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#625bff",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#625bff",
              },
            }}
          >
            <MenuItem value={1} sx={{ fontSize: "14px" }}>
              Наличный расчет
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: "14px" }}>
              Рассрочка
            </MenuItem>
          </TextField>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr auto"
          gap={3}
          width="100%"
        >
          <TextField
            label="Цена собственника"
            placeholder="50000..."
            type="number"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Цена объекта"
            placeholder="50000..."
            type="number"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Валюта"
            select
            fullWidth
            size="small"
            defaultValue="KGS"
            variant="outlined"
          >
            <MenuItem value="KGS" sx={{ fontSize: "14px" }}>
              KGS
            </MenuItem>
            <MenuItem value="USD" sx={{ fontSize: "14px" }}>
              USD
            </MenuItem>
          </TextField>
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={"1fr 1fr"}
          width={"100%"}
          gap={4}
        >
          <Box display={"grid"} gap={1.4} fontSize={"14px"} maxWidth={"100%"}>
            Этажность:
            <Box display={"flex"} gap={1} overflow={"auto"}>
              {Object.keys(FloorsObj).map((key) => {
                const item = FloorsObj[+key];
                return (
                  <Box
                    key={item.id}
                    onClick={() => setSelectedFloor(item.id)}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    padding="6px 12px"
                    border={`.5px solid ${
                      selectedFloor === item.id ? "#625bff" : "#dfdfdf"
                    }`}
                    borderRadius="4px"
                    bgcolor={
                      selectedFloor === item.id ? "#635bff12" : "#f8f8f8"
                    }
                    sx={{ cursor: "pointer" }}
                    color={selectedFloor === item.id ? "#625bff" : "inherit"}
                  >
                    <Typography fontSize="14px" whiteSpace="nowrap">
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box display={"grid"} gap={1.4} fontSize={"14px"} maxWidth={"100%"}>
            Комнаты:
            <Box display={"flex"} gap={1} overflow={"auto"}>
              {Object.keys(RoomsObj).map((key) => {
                const item = RoomsObj[+key];
                return (
                  <Box
                    key={item.id}
                    onClick={() => setSelectedRoom(item.id)}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    padding="6px 12px"
                    border={`.5px solid ${
                      selectedRoom === item.id ? "#625bff" : "#dfdfdf"
                    }`}
                    borderRadius="4px"
                    bgcolor={selectedRoom === item.id ? "#635bff12" : "#f8f8f8"}
                    sx={{ cursor: "pointer" }}
                    color={selectedRoom === item.id ? "#625bff" : "inherit"}
                  >
                    <Typography fontSize="14px" whiteSpace="nowrap">
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={"30% auto"}
          width={"100%"}
          gap={5}
        >
          <Box display={"grid"} gap={1}>
            <TextField
              label="Квадратура"
              placeholder="0"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <Typography>m²</Typography>,
              }}
              fullWidth
              size="small"
            />
            <TextField
              label="Материалы стен"
              select
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                fontSize: "14px",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#625bff",
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#625bff",
                },
              }}
            >
              <MenuItem value={1} sx={{ fontSize: "14px" }}>
                Кирпич
              </MenuItem>
              <MenuItem value={2} sx={{ fontSize: "14px" }}>
                Пеноблок
              </MenuItem>
            </TextField>
          </Box>
          <Box>
            <TextField
              label="Примечание"
              multiline
              rows={3}
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                fontSize: "14px",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#625bff",
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#625bff",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          display={"grid"}
          width={"100%"}
          gap={2}
          gridTemplateColumns={"1fr 1fr"}
        >
          <FileUploadField />
          <MultiSelect
            items={[
              { id: 1, label: "Договор купли-продажи" },
              { id: 2, label: "Красная книга" },
              { id: 3, label: "Зеленая книга" },
            ]}
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"end"} width={"100%"}>
        <CustomBtn
          icon={<CheckOutlined fontSize={"small"} />}
          label="Сохранить"
          onClick={() => console.log(1)}
        />
      </Box>
    </Container>
  );
};

export default AddRealEstateContainer;
