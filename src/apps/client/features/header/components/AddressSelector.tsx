import React from "react";
import { Box, Typography, IconButton, SwipeableDrawer, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";
import { useGetUserLocationByIdQuery } from "@store/user/api/userLocationApi";
import { authState } from "@store/user/slices/authSlice";
import { useNavigate } from "react-router-dom";

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
      {/* Нижний Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={addressSelector}
        onClose={() => AddressSelectorToggle(false)}
        onOpen={() => AddressSelectorToggle(true)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
            zIndex: 1500,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Выбор адреса
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            p: 2,
            borderRadius: "16px",
            backgroundColor: "white",
            boxShadow: 2,
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Мои адреса
          </Typography>

          {locationList?.map((location) => (
            <Box display="flex" alignItems="center" mt={1} key={location.id}>
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
        </Box>
        <Box
          sx={{
            p: 1,
            borderRadius: "16px",
            backgroundColor: "#f5f4f2",
            mb: 2,
            textAlign: "center",
          }}
        >
          <Box onClick={navigateToMaps}>
            <Button sx={{ color: "black", fontWeight: 500 }}>Указать другой адрес</Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
