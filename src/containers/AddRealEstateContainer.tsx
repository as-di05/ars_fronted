import React, { useCallback, useEffect, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import CustomBtn from "../components/CustomBtn";
import { CheckOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import CategoriesBar from "../components/CategoriesBar";
import { categoriesData, FloorsObj, RoomsObj } from "../utils/config";
import FileUploadField from "../components/FileUploadField";
import MultiSelect from "../components/MultiSelect";
import { apiRequest } from "../utils/api";
import imageCompression from "browser-image-compression";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface AddRealEstateContainerProps {
  getRealEstates: (filter: { [key: string]: any }) => void;
}

const ScrollClassStyle = {
  "&::-webkit-scrollbar": {
    height: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f0f0f0",
  },
  // scrollbarWidth: "thin",
  paddingBottom: "3px"
};

const AddRealEstateContainer: React.FC<AddRealEstateContainerProps> = ({
  getRealEstates,
}) => {
  const navigate = useNavigate();
  const districtsData = useSelector((state: RootState) => state.districts);
  const dealTypesData = useSelector((state: RootState) => state.dealTypes);
  const reSeriesData = useSelector((state: RootState) => state.reSeries);
  const reHeatingsData = useSelector((state: RootState) => state.reHeatings);
  const documentsData = useSelector((state: RootState) => state.documents);
  const wallMaterialsData = useSelector(
    (state: RootState) => state.wallMaterials
  );
  const [selectedFloor, setSelectedFloor] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerPhone, setOwnerPhone] = useState<string>("");
  const [currency, setCurrency] = useState<"USD" | "KGS">("KGS");
  const [price, setPrice] = useState<{
    ownerPrice: number | null;
    objectPrice: number | null;
    currency: "USD" | "KGS";
  }>({
    ownerPrice: null,
    objectPrice: null,
    currency: "KGS",
  });
  const [addData, setAddData] = useState<any>({
    categoryId: 1,
    ownerName: null,
    ownerPhone: null,
    idRoom: null,
    area: null,
    idFloor: null,
    idSeries: null,
    idHeating: null,
    idDistrict: null,
    idDealType: null,
    idWallMaterial: null,
    description: null,
    documents: null,
    ownerPrice: null,
    objectPrice: null,
    currency: "USD",
  });

  const [reqAdded, setReqAdded] = useState<any>({
    categoryId: null,
    idDistrict: null,
    idRoom: null,
    idSeries: null,
    idFloor: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

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
      ownerName &&
      ownerPhone &&
      addData.idDistrict &&
      price.ownerPrice &&
      price.objectPrice &&
      selectedRoom &&
      selectedFloor
    );
  };

  const handleSubmit = async () => {
    const data: any = new FormData();
    const compressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1500,
      useWebWorker: true,
    };
    data.append("categoryId", addData.categoryId);
    data.append("ownerName", addData.ownerName);
    data.append("ownerPhone", addData.ownerPhone);
    data.append("idRoom", addData.idRoom);
    data.append("area", addData.area);
    data.append("idFloor", addData.idFloor);
    addData.idSeries && data.append("idSeries", addData.idSeries);
    data.append("idDistrict", addData.idDistrict);
    data.append("idDealType", addData.idDealType);
    data.append("idWallMaterial", addData.idWallMaterial);
    data.append("description", addData.description);
    data.append("idHeating", addData.idHeating);
    data.append("ownerPrice", addData.ownerPrice);
    data.append("objectPrice", addData.objectPrice);
    data.append("currency", addData.currency);

    if (addData.documents && addData.documents.length > 0) {
      addData.documents.forEach((doc: any) => {
        data.append("documents", doc);
      });
    }

    for (const file of selectedImages) {
      try {
        const compressedFile = await imageCompression(file, compressionOptions);
        data.append("images", compressedFile);
      } catch (error) {
        console.error(`Error compressing file ${file.name}:`, error);
      }
    }
    try {
      const response: any = await apiRequest(
        "POST",
        "/real-estate/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status === true) {
        navigate("/real-estates");
      }
    } catch (e) {}
  };

  const fetchData = useCallback(async () => {
    await getRealEstates({
      filter: {
        categoryId: addData.categoryId,
        districtId: addData.idDistrict,
        floorId: addData.idFloor,
        roomId: addData.idRoom,
        seriesId: addData.idSeries,
      },
    });
  }, [addData]);

  useEffect(() => {
    if (
      addData.categoryId &&
      addData.idRoom &&
      addData.idDistrict &&
      addData.idSeries &&
      addData.idFloor &&
      reqAdded &&
      (addData.categoryId !== reqAdded?.categoryId ||
        addData.idDistrict !== reqAdded?.idDistrict ||
        addData.idRoom !== reqAdded?.idRoom ||
        addData.idSeries !== reqAdded?.idSeries ||
        addData.idFloor !== reqAdded?.idFloor)
    ) {
      fetchData();
      setReqAdded({
        categoryId: addData.categoryId,
        idDistrict: addData.idDistrict,
        idFloor: addData.idFloor,
        idRoom: addData.idRoom,
        idSeries: addData.idSeries,
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
        height="calc(100vh - 205px)"
        flexDirection={"column"}
        alignItems="start"
        overflow={"scroll"}
        gap={5}
      >
        <Box display={"grid"} gap={1.4} fontSize={"14px"}>
          Выберите категорию:
          <CategoriesBar
            data={categoriesData}
            handleSelect={handleSelectCategory}
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} width="100%">
          <TextField
            label="ФИО клиента"
            placeholder="Асанов Эсен А..."
            fullWidth
            size="small"
            name="ownerName"
            value={ownerName || ""}
            onChange={(e: any) => setOwnerName(e.target.value)}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Номер клиента"
            placeholder="05000055..."
            fullWidth
            size="small"
            name="ownerPhone"
            value={ownerPhone || ""}
            onChange={(e: any) => setOwnerPhone(e.target.value)}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} width="100%">
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
          <TextField
            label="Тип сделки"
            select
            fullWidth
            size="small"
            variant="outlined"
            name="idDealType"
            value={addData.idDealType ?? 0}
            onChange={handleFormChange}
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
            <MenuItem value={0} sx={{ fontSize: "14px" }}>
              --------
            </MenuItem>
            {dealTypesData.state?.length && dealTypesData.state?.length > 0
              ? dealTypesData.state.map((item, index) => {
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
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} width="100%">
          <TextField
            label="Серия"
            select
            fullWidth
            name="idSeries"
            value={addData.idSeries ?? 0}
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
          >
            <MenuItem value={0} sx={{ fontSize: "14px" }}>
              --------
            </MenuItem>
            {reSeriesData.state?.length && reSeriesData.state?.length > 0
              ? reSeriesData.state.map((item, index) => {
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
          <TextField
            label="Отопление"
            select
            fullWidth
            name="idHeating"
            value={addData.idHeating ?? 0}
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
          >
            <MenuItem value={0} sx={{ fontSize: "14px" }}>
              --------
            </MenuItem>
            {reHeatingsData.state?.length && reHeatingsData.state?.length > 0
              ? reHeatingsData.state.map((item, index) => {
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
            label="Цена собственника"
            placeholder="50000..."
            type="number"
            fullWidth
            name="ownerPrice"
            value={price.ownerPrice || ""}
            onChange={(e: any) =>
              setPrice({ ...price, ownerPrice: e.target.value })
            }
            onBlur={handleBlur}
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
            name="objectPrice"
            value={price.objectPrice || ""}
            onChange={(e: any) =>
              setPrice({ ...price, objectPrice: e.target.value })
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
          gridTemplateColumns={"1fr 1fr"}
          width={"100%"}
          gap={4}
        >
          <Box display={"grid"} gap={1.4} fontSize={"14px"} maxWidth={"100%"}>
            Этажность:
            <Box
              display={"flex"}
              gap={1}
              overflow={"auto"}
              sx={ScrollClassStyle}
            >
              {Object.keys(FloorsObj).map((key) => {
                const item = FloorsObj[+key];
                return (
                  <Box
                    key={item.id}
                    onClick={() => {
                      setSelectedFloor(item.id);
                      setAddData({
                        ...addData,
                        ["idFloor"]: item.id,
                      });
                    }}
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
            <Box
              display={"flex"}
              gap={1}
              overflow={"auto"}
              sx={ScrollClassStyle}
            >
              {Object.keys(RoomsObj).map((key) => {
                const item = RoomsObj[+key];
                return (
                  <Box
                    key={item.id}
                    onClick={() => {
                      setSelectedRoom(item.id);
                      setAddData({
                        ...addData,
                        ["idRoom"]: item.id,
                      });
                    }}
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
              name="area"
              value={addData.area}
              onChange={handleFormChange}
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
              name="idWallMaterial"
              value={addData.idWallMaterial ?? 0}
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
            >
              <MenuItem value={0} sx={{ fontSize: "14px" }}>
                --------
              </MenuItem>
              {wallMaterialsData.state?.length &&
              wallMaterialsData.state?.length > 0
                ? wallMaterialsData.state.map((item, index) => {
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
          <Box>
            <TextField
              label="Примечание"
              multiline
              rows={3}
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
        <Box
          display={"grid"}
          width={"100%"}
          gap={2}
          gridTemplateColumns={"1fr 1fr"}
        >
          <FileUploadField onFileChange={handleFileChange} />
          <MultiSelect
            onChange={(name: string, selectedIds: number[]) => {
              setAddData({
                ...addData,
                [name]: selectedIds ?? null,
              });
            }}
            name={"documents"}
            items={
              documentsData.state && documentsData.state.length
                ? documentsData.state
                : []
            }
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"end"} width={"100%"}>
        <CustomBtn
          icon={<CheckOutlined fontSize={"small"} />}
          label="Сохранить"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        />
      </Box>
    </Container>
  );
};

export default AddRealEstateContainer;
