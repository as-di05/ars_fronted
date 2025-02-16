import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  ImageList,
  ImageListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
} from "@mui/material";
import {
  ArrowForward,
  ArrowBack,
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  CropFreeTwoTone,
  StairsRounded,
  MeetingRoomRounded,
  ConstructionRounded,
  PlaceOutlined,
  TaskRounded,
  CurrencyExchangeOutlined,
  AutoAwesomeMotionOutlined,
  LocalFireDepartmentOutlined,
  EditRounded,
} from "@mui/icons-material";
import Container from "../containers/Container";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FloorsObj, ReStatusObj, RoomsObj } from "../utils/config";
import UserCard from "./UserCard";
import FavoriteButton from "./FavoriteBtn";
import { useAppSelector } from "../hooks/hooks";
import { apiRequest } from "../utils/api";

interface FullRealEstateViewProps {
  data: any;
}

const FullRealEstateView: React.FC<FullRealEstateViewProps> = ({ data }) => {
  const currentUserState = useAppSelector((state) => state.currentUser);
  const wallMaterialsData = useAppSelector((state) => state.wallMaterials);
  const seriesData = useAppSelector((state) => state.reSeries);
  const heatingsData = useAppSelector((state) => state.reHeatings);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [realEstateStatusId, setRealEstateStatusId] = useState<any>(null);

  const handleEditStatus = async (id: number) => {
    if (!id || !selectedStatus) {
      return;
    }
    try {
      const response: any = await apiRequest(
        "POST",
        "/real-estate/update-status",
        {
          id: id,
          statusId: selectedStatus,
        }
      );
      if (response?.status === true) {
        setRealEstateStatusId(selectedStatus);
      }
      handleClose();
    } catch (e) {}
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(Number(event.target.value));
  };

  const handleImageClick = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % data.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (currentIndex - 1 + data.images.length) % data.images.length
    );
  };

  useEffect(() => {
    if (data?.idStatus) {
      setSelectedStatus(data?.idStatus);
      setRealEstateStatusId(data?.idStatus);
    } else {
      setSelectedStatus(null);
      setRealEstateStatusId(null);
    }
  }, [data]);

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `"${day}-${month}-${year}"`;
  }

  const renderStatus = (statusId: number) => {
    if (!ReStatusObj[selectedStatus]) {
      return null;
    }
    return (
      <Box display="flex" position="relative">
        <Box
          sx={{
            width: "min-content",
            display: "flex",
            alignItems: "center",
            backgroundColor: `${ReStatusObj[statusId]?.color}30`,
            padding: "6px 25px",
            borderRadius: "6px",
            gap: "3px",
          }}
        >
          <Typography
            variant="body2"
            fontSize={15}
            fontWeight="500"
            color={ReStatusObj[statusId]?.color}
          >
            {ReStatusObj[statusId]?.label}
          </Typography>
        </Box>
        <IconButton
          onClick={handleOpen}
          sx={{
            position: "absolute",
            top: "-15px",
            right: "-15px",
            color: "#ffa600",
            borderRadius: "50%",
            "&:hover": {
              background: "none",
              scale: "1.1",
            },
          }}
        >
          {currentUserState.state?.id === data?.employee?.id ? (
            <EditRounded sx={{ width: "20px", height: "20px" }} />
          ) : null}
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ padding: "10px" }}>
            <DialogTitle>Изменение статуса объекта</DialogTitle>
            <DialogContent>
              <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
                {Object.entries(ReStatusObj).map(([id, status]: any) => (
                  <FormControlLabel
                    key={id}
                    value={id}
                    control={<Radio />}
                    label={status.label}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Отмена
              </Button>
              <Button
                onClick={() => handleEditStatus(data?.id)}
                color="primary"
                variant="contained"
              >
                Сохранить
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    );
  };

  return (
    <Container
      display="flex"
      flexDirection={"column"}
      alignItems="start"
      gap={1}
    >
      {data ? (
        <Box
          display={"grid"}
          width={"100%"}
          gridTemplateColumns={"auto 28%"}
          gap={3}
        >
          <Box display={"grid"} width={"100%"} gap={1.5}>
            <Box
              display={"grid"}
              height={"400px"}
              alignItems={"start"}
              width={"100%"}
              gridTemplateColumns={"auto 20%"}
              gap={1}
            >
              <Box display={"grid"}>
                <Box
                  position={"relative"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: "400px",
                    overflow: "hidden",
                    border: "1px solid #625bff",
                    borderRadius: "8px",
                    background: "#e9f0fd",
                  }}
                >
                  {data.images?.length ? (
                    <img
                      src={data.images[currentIndex]?.url}
                      alt={`Image ${currentIndex + 1}`}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <img
                      src="/no_photo.png"
                      alt="No Image"
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "contain",
                      }}
                    />
                  )}

                  <Box
                    position={"absolute"}
                    zIndex={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      bottom: 10,
                      gap: 2,
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                  >
                    <IconButton
                      onClick={handlePrev}
                      disabled={!data.images?.length}
                      sx={{
                        color: "#fff",
                        backgroundColor: "rgba(0, 0, 0, 0.250)",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                      }}
                    >
                      <ArrowBackIosOutlined />
                    </IconButton>
                    <IconButton
                      onClick={handleNext}
                      disabled={!data.images?.length}
                      sx={{
                        color: "#fff",
                        backgroundColor: "rgba(0, 0, 0, 0.250)",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                      }}
                    >
                      <ArrowForwardIosOutlined />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"grid"}
                gap={1}
                sx={{
                  height: "400px",
                  borderRadius: "4px",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {data.images && data.images?.length
                  ? data.images.map(
                      (img: { id: string; url: string }, index: number) => (
                        <img
                          key={index}
                          width={"100%"}
                          src={img?.url}
                          alt={`Image ${index + 1}`}
                          height="100px"
                          loading="lazy"
                          onClick={() => handleImageClick(index)}
                          style={{
                            cursor: "pointer",
                            border:
                              currentIndex === index
                                ? "2px solid #625bff"
                                : "none",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                      )
                    )
                  : null}
              </Box>
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <Box display={"grid"}>
                <Typography variant="h4" fontSize={16} fontWeight={600}>
                  {data.ownerName}{" "}
                  {currentUserState.state?.role &&
                  currentUserState.state?.role?.id < 3 &&
                  data.ownerPhone
                    ? `(${data.ownerPhone})`
                    : null}
                </Typography>
                <Typography
                  fontSize={15}
                  alignItems={"center"}
                  display={"flex"}
                  gap={0.5}
                >
                  <PlaceOutlined
                    sx={{ color: "#625bff", width: "14px", height: "14px" }}
                  />
                  {data.district?.label}
                </Typography>
              </Box>
              {renderStatus(realEstateStatusId)}
            </Box>
            <Box
              height={"100%"}
              width={"100%"}
              display={"grid"}
              gridTemplateColumns={"35% auto"}
              gap={2}
            >
              <Box
                border={".5px solid #625bff"}
                borderRadius={"6px"}
                padding={"8px 10px"}
                display={"grid"}
                alignItems={"start"}
                gridTemplateRows={"21px auto"}
                gap={1}
                boxShadow={"2px 3px 4px #635bff67"}
              >
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  color="#0f0f14"
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.8}
                >
                  <TaskRounded
                    sx={{ width: "16px", height: "16px", color: "#625bff" }}
                  />
                  Документы:
                </Typography>
                <Box display={"grid"} gap={0.8}>
                  {data.documents?.map((item: any) => {
                    return (
                      <Box key={item.id} fontSize={14}>
                        - {item.label}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box
                border={".5px solid #625bff"}
                borderRadius={"6px"}
                padding={"8px 10px"}
                display={"grid"}
                alignItems={"start"}
                gridTemplateRows={"21px auto"}
                gap={1}
                boxShadow={"2px 3px 4px #635bff67"}
              >
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  color="#0f0f14"
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.8}
                >
                  <CurrencyExchangeOutlined
                    sx={{ width: "16px", height: "16px", color: "#625bff" }}
                  />
                  Цены:
                </Typography>
                <Box display={"grid"} gap={0.8} justifyContent={"start"}>
                  {data.prices?.map((item: any) => {
                    const updatedAt = new Date(item.updatedAt);
                    const year = updatedAt.getFullYear();
                    const month = updatedAt.getMonth();
                    const day = updatedAt.getDate();
                    return (
                      <Box key={item.id}>
                        <Typography
                          fontSize={14}
                          whiteSpace={"nowrap"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          {(item.objectPrice || item.ownerPrice) && ` - `}
                          {item.objectPrice ? (
                            <span style={{ fontWeight: 500 }}>
                              {item.objectPrice}
                              {item.currency}
                            </span>
                          ) : null}{" "}
                          {item.ownerPrice
                            ? ` / ${item.ownerPrice}${item.currency} (собстветнник) `
                            : null}
                          - {formatDate(item.updatedAt)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems="start"
            gap={3}
          >
            <Box width={"100%"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
              >
                <Typography variant="body2" fontSize={18} fontWeight={600}>
                  <span>ID: {data.id}</span>
                  {" - "}
                  {data.category.label}
                </Typography>
                <FavoriteButton
                  realEstateId={data.id}
                  isFavorite={data.isFavorite}
                />
              </Box>
            </Box>
            <Box>
              <UserCard
                size="big"
                inFull={true}
                firstName={data.employee.firstName}
                lastName={data.employee.lastName}
                phone={data.employee.phone}
                avatarUrl={data.employee.avatarUrl}
              />
            </Box>
            <Box display={"grid"} gap={1.2}>
              <Typography fontSize={15}>Общие данные:</Typography>
              <Box margin={"0 0 0 8px"} display={"grid"} gap={1.1}>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"136px auto"}
                  gap={2}
                  alignItems={"center"}
                >
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={"13px"}
                    gap={0.7}
                  >
                    <CropFreeTwoTone
                      sx={{ color: "#625bff", width: "13px", height: "14px" }}
                    />
                    Площадь:
                  </Typography>
                  <Typography fontSize={"13px"}>{data.area}m²</Typography>
                </Box>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"136px auto"}
                  gap={2}
                  alignItems={"center"}
                >
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={"13px"}
                    gap={0.7}
                  >
                    <StairsRounded
                      sx={{ color: "#625bff", width: "13px", height: "14px" }}
                    />
                    Этажность:
                  </Typography>
                  <Typography fontSize={"13px"}>
                    {FloorsObj[data.idFloor].label}
                  </Typography>
                </Box>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"136px auto"}
                  gap={2}
                  alignItems={"center"}
                >
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={"13px"}
                    gap={0.7}
                  >
                    <MeetingRoomRounded
                      sx={{ color: "#625bff", width: "13px", height: "14px" }}
                    />
                    Комнаты:
                  </Typography>
                  <Typography fontSize={"13px"}>
                    {RoomsObj[data.idRoom].label}
                  </Typography>
                </Box>

                {data.idWallMaterial && (
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"136px auto"}
                    gap={2}
                    alignItems={"center"}
                  >
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      fontSize={"13px"}
                      gap={0.7}
                    >
                      <ConstructionRounded
                        sx={{ color: "#625bff", width: "13px", height: "14px" }}
                      />
                      Материалы стен:{" "}
                    </Typography>
                    <Typography fontSize={"13px"}>
                      {wallMaterialsData.state?.length
                        ? wallMaterialsData.state.find(
                            (item) => item.id === data.idWallMaterial
                          )?.label
                        : null}
                    </Typography>
                  </Box>
                )}
                {data.idSeries && (
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"136px auto"}
                    gap={2}
                    alignItems={"center"}
                  >
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      fontSize={"13px"}
                      gap={0.7}
                    >
                      <AutoAwesomeMotionOutlined
                        sx={{ color: "#625bff", width: "13px", height: "14px" }}
                      />
                      Серия:{" "}
                    </Typography>
                    <Typography fontSize={"13px"}>
                      {seriesData.state?.length
                        ? seriesData.state.find(
                            (item) => item.id === data.idSeries
                          )?.label
                        : null}
                    </Typography>
                  </Box>
                )}
                {data.idHeating && (
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"136px auto"}
                    gap={2}
                    alignItems={"center"}
                  >
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      fontSize={"13px"}
                      gap={0.7}
                    >
                      <LocalFireDepartmentOutlined
                        sx={{ color: "#625bff", width: "13px", height: "14px" }}
                      />
                      Отопление:{" "}
                    </Typography>
                    <Typography fontSize={"13px"}>
                      {heatingsData.state?.length
                        ? heatingsData.state.find(
                            (item) => item.id === data.idHeating
                          )?.label
                        : null}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box display={"grid"} gap={1.2}>
              <Typography fontSize={15}>Примечание:</Typography>
              <Box margin={"0 0 0 8px"} display={"grid"}>
                <Typography
                  fontSize={"13px"}
                  lineHeight={1.4}
                  maxHeight={300}
                  overflow={"scroll"}
                >
                  {data.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        "Объект не найден!"
      )}
    </Container>
  );
};

export default FullRealEstateView;
