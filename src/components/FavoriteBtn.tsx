import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { apiRequest } from "../utils/api";

interface RealEstateProps {
  realEstateId: number;
  isFavorite: boolean;
  className?: any;
}

const FavoriteButton: React.FC<RealEstateProps> = ({
  realEstateId,
  isFavorite,
  className,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const handleAddFavorite = async () => {
    try {
      const response: any = await apiRequest(
        "POST",
        "/real-estate/add-favorite",
        {
          idRealEstate: realEstateId,
        }
      );

      if (response?.status) {
        setIsFavoriteState(true);
      } else {
        console.error("Error adding to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response: any = await apiRequest(
        "DELETE",
        `/real-estate/remove-favorite/${realEstateId}`
      );
      if (response?.status) {
        setIsFavoriteState(false);
      } else {
        console.error("Error removing from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavoriteState) {
      handleRemoveFavorite();
    } else {
      handleAddFavorite();
    }
  };

  return (
    <IconButton
      className={className}
      onClick={handleFavoriteToggle}
      color={isFavoriteState ? "secondary" : "default"}
      size="large"
      sx={{
        backgroundColor: "none",
      }}
    >
      {isFavoriteState ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
