import React, { useCallback, useEffect, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import CustomBtn from "../components/CustomBtn";
import { CheckOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import CategoriesBar from "../components/CategoriesBar";
import { categoriesData } from "../utils/config";
import { apiRequest } from "../utils/api";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface AddCustomerContainerProps {}

const AddCustomerContainer: React.FC<AddCustomerContainerProps> = ({}) => {
  const navigate = useNavigate();
  const districtsData = useSelector((state: RootState) => state.districts);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [currency, setCurrency] = useState<"USD" | "KGS">("KGS");
  const [price, setPrice] = useState<{
    startPrice: number | null;
    endPrice: number | null;
    currency: "USD" | "KGS";
  }>({
    startPrice: null,
    endPrice: null,
    currency: "KGS",
  });
  const [addData, setAddData] = useState<any>({
    categoryId: 1,
    customerName: null,
    customerPhone: null,
    idDistrict: null,
    description: null,
    startPrice: null,
    endPrice: null,
    currency: "USD",
  });

  const [reqAdded, setReqAdded] = useState<any>({
    categoryId: null,
    idDistrict: null,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddData({
      ...addData,
      [name]: value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setAddData({
      ...addData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCategory = (categoryId: number) => {
    setAddData({
      ...addData,
      ["categoryId"]: categoryId,
    });
  };

  const isFormValid = (): boolean => {
    return (
      addData.categoryId &&
      customerName &&
      customerPhone &&
      addData.idDistrict &&
      price.startPrice &&
      price.endPrice
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const data = {
      categoryId: addData.categoryId,
      customerName: customerName,
      customerPhone: customerPhone,
      idDistrict: addData.idDistrict,
      description: addData.description,
      startPrice: addData.startPrice,
      endPrice: addData.endPrice,
      currency: currency,
    };
    try {
      const response: any = await apiRequest("POST", "/customers/create", data);
      if (response?.status === true) {
        navigate("/customers");
      } else {
        console.error("Error:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error registering customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      addData.categoryId &&
      addData.idDistrict &&
      reqAdded &&
      (addData.categoryId !== reqAdded?.categoryId ||
        addData.idDistrict !== reqAdded?.idDistrict)
    ) {
      setReqAdded({
        categoryId: addData.categoryId,
        idDistrict: addData.idDistrict,
      });
    }
  }, [addData, reqAdded]);

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
        width={"100%"}
        height="calc(100vh - 205px)"
        flexDirection={"column"}
        alignItems="start"
        overflow={"scroll"}
        gap={5}
      >
        <Box display={"grid"} gap={1.4} width={"100%"} fontSize={"14px"}>
          Выберите категорию:
          <CategoriesBar
            data={categoriesData}
            handleSelect={handleSelectCategory}
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} width="100%">
          <TextField
            label="ФИО покупателя"
            placeholder="Асанов Эсен А..."
            fullWidth
            size="small"
            name="customerName"
            value={customerName || ""}
            onChange={(e: any) => setCustomerName(e.target.value)}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Номер покупателя"
            placeholder="05000055..."
            fullWidth
            size="small"
            name="customerPhone"
            value={customerPhone || ""}
            onChange={(e: any) => setCustomerPhone(e.target.value)}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box display="grid" width="100%">
          <TextField
            label="Район"
            select
            fullWidth
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name="idDistrict"
            value={addData.idDistrict ?? 0}
            onChange={handleFormChange}
          >
            <MenuItem value={0} sx={{ fontSize: "14px" }}>
              --------
            </MenuItem>
            {districtsData.state?.length && districtsData.state?.length > 0
              ? districtsData.state.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      sx={{ fontSize: "14px" }}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })
              : null}
          </TextField>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr auto"
          gap={3}
          width="100%"
        >
          <TextField
            label="Цена от"
            placeholder="10000..."
            type="number"
            fullWidth
            name="startPrice"
            value={price.startPrice || ""}
            onChange={(e: any) =>
              setPrice({ ...price, startPrice: e.target.value })
            }
            onBlur={handleBlur}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Цена до"
            placeholder="50000..."
            type="number"
            fullWidth
            name="endPrice"
            value={price.endPrice || ""}
            onChange={(e: any) =>
              setPrice({ ...price, endPrice: e.target.value })
            }
            onBlur={handleBlur}
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
            name="currency"
            value={currency || ""}
            onChange={(e: any) => setCurrency(e.target.value)}
            onBlur={handleBlur}
            defaultValue={currency}
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
          gridTemplateColumns={"auto"}
          width={"100%"}
          gap={6}
        >
          <Box>
            <TextField
              label="Примечание"
              multiline
              rows={5}
              fullWidth
              name="description"
              value={addData.description}
              onChange={handleFormChange}
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
      </Box>
      <Box display={"flex"} justifyContent={"end"} width={"100%"}>
        <CustomBtn
          icon={<CheckOutlined fontSize={"small"} />}
          label={isSubmitting ? "Добавление..." : "Добавить"}
          disabled={!isFormValid() || isSubmitting}
          onClick={handleSubmit}
        />
      </Box>
    </Container>
  );
};

export default AddCustomerContainer;
