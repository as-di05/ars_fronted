import React from "react";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import { IRealEstate } from "../types/types";

interface MatchedRealEstateProps {
  items: IRealEstate[];
}

const MatchedRealEstate: React.FC<MatchedRealEstateProps> = ({ items }) => {
  return (
    <Box
      display="grid"
      width={"100%"}
      height="calc(100vh - 145px)"
      overflow={"auto"}
      padding={"4px"}
    >
      {items.length ? (
        items.map((property) => (
          <Card
            key={property.id}
            sx={{
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: 2,
              height: "260px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
              }}
              image={
                property?.images?.length
                  ? property.images[0].url
                  : "/no_photo.png"
              }
              alt={property.description}
            />
            <Box
              sx={{ padding: "10px", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="body2" fontWeight={600}>
                ID: {property.id} -{" "}
                {property.id === 4 ? "Ком. помещение" : property.category.label}
              </Typography>
              <Typography variant="body2" fontSize="12px" fontWeight={500}>
                {property.ownerName}
              </Typography>
              <Typography
                variant="body2"
                fontSize="12px"
                color="textSecondary"
                fontWeight={400}
              >
                {property.district?.label}
              </Typography>
              <Typography variant="body2" fontSize="12px" color="textSecondary">
                Этаж: {property.idFloor ?? "Не указан"}
              </Typography>
              <Typography variant="body2" fontSize="12px" color="textSecondary">
                Комната: {property.idRoom ?? "Не указана"}
              </Typography>
            </Box>
          </Card>
        ))
      ) : (
        <Typography margin={"auto"} fontWeight={600}>
          Отсутствуют...
        </Typography>
      )}
    </Box>
  );
};

export default MatchedRealEstate;
