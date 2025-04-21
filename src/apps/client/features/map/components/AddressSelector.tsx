import React, { useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";
import { useGetUserLocationByIdQuery, useToggleActiveLocationMutation } from "@store/user/api/userLocationApi";
import { authState } from "@store/user/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { CustomSwipeableDrawer } from "@/apps/common/CustomSwipeableDrawer";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const AddressSelector: React.FC = () => {
  const { isUser } = useSelector(authState);
  const { addressSelector } = useSelector(modals);
  const { AddressSelectorToggle } = useActions();
  const { data: locationList } = useGetUserLocationByIdQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });
  const [toogleActive, { isLoading }] = useToggleActiveLocationMutation();
  const [changingId, setChangingId] = useState(0);

  const navigate = useNavigate();

  const navigateToMaps = () => {
    navigate("maps");
    AddressSelectorToggle(false);
  };

  const handleLocationClick = async (locationId: number) => {
    if (isUser?.user_id) {
      setChangingId(locationId);
      await toogleActive(locationId).unwrap();
    }
  };

  return (
    <Box>
      <CustomSwipeableDrawer
        open={addressSelector}
        onClose={() => AddressSelectorToggle(false)}
        onOpen={() => AddressSelectorToggle(true)}
        onSubmit={navigateToMaps}
        title="Выберите адрес"
        buttonText="Указать адрес"
      >
        <Typography variant="h6" fontWeight="bold">
          Мои адреса
        </Typography>
        {locationList?.map((location) => (
          <div onClick={() => handleLocationClick(location.id)} key={location.id}>
            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} mt={1}>
              {location.is_active ? (
                <BookmarkAddedIcon color="warning" />
              ) : isLoading && location.id === changingId ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <BookmarkBorderIcon />
              )}
              <Box ml={1} flexGrow={1}>
                <Typography>{location.name || location.address}</Typography>
                <Typography color="text.secondary" variant="body2">
                  подъезд {location.entrance}, этаж {location.floor}, кв. {location.apartment}
                </Typography>
              </Box>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Box>
          </div>
        ))}
      </CustomSwipeableDrawer>
    </Box>
  );
};
