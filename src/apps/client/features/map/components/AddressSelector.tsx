import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";
import { useGetUserLocationByIdQuery } from "@store/user/api/userLocationApi";
import { authState } from "@store/user/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { CustomSwipeableDrawer } from "@/apps/common/CustomSwipeableDrawer";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const AddressSelector: React.FC = () => {
  const { isUser } = useSelector(authState);
  const { addressSelector } = useSelector(modals);
  const { AddressSelectorToggle } = useActions();
  const { data: locationList } = useGetUserLocationByIdQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });

  const navigate = useNavigate();

  const navigateToMaps = () => {
    navigate("maps");
    AddressSelectorToggle(false);
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
          <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} mt={1} key={location.id}>
            <BookmarkBorderIcon />
            <Box ml={1} flexGrow={1}>
              <Typography>{location.entrance}</Typography>
              <Typography color="text.secondary" variant="body2">
                подъезд 10, этаж 3, кв. 77
              </Typography>
            </Box>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
        ))}
      </CustomSwipeableDrawer>
    </Box>
  );
};
