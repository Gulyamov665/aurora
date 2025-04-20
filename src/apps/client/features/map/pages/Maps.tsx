import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box, CircularProgress, IconButton, Button } from "@mui/material";
import { MoveHandler } from "../components/MoveHandler";
import { Map as LeafletMap } from "leaflet";
import { styles } from "../assets/styles";
import { motion } from "framer-motion";
import { useLazyGetLocationsQuery } from "@store/user/api/locationApi";
import { formatAddress } from "@/Utils/tools";
import { DragWatcher } from "../components/DragWatcher";
import { useAddUserLocationMutation } from "@store/user/api/userLocationApi";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { CustomSwipeableDrawer } from "@/apps/common/CustomSwipeableDrawer";
import { LocationForm } from "../components/LocationForm";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import marker from "@/assets/gps.png";
import { useForm } from "react-hook-form";
import { LocationData } from "../types";
import { useNavigate } from "react-router-dom";

const defaultPosition = { lat: 39.7467565, lng: 64.4111207 };

// TODO НУЖНА ДЕКОМПОЗИЦИЯ!!!

const OsmMapWithAutocomplete = () => {
  const [getLocation, { data, isFetching }] = useLazyGetLocationsQuery();
  const { isUser } = useSelector(authState);
  const [addUserLocation] = useAddUserLocationMutation();
  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [openLocationForm, setOpenLocationForm] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const { register, handleSubmit } = useForm<LocationData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setAddress(formatAddress(data.address));
  }, [data]);

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается в вашем браузере.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = { lat: latitude, lng: longitude };
        setPosition(newPos);

        if (mapRef.current) {
          mapRef.current.setView([newPos.lat, newPos.lng], 18);
        }
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);

        switch (error.code) {
          case 1:
            alert("Вы отклонили доступ к геолокации.");
            break;
          case 2:
            alert("Местоположение недоступно.");
            break;
          case 3:
            alert("Время ожидания определения местоположения истекло.");
            break;
          default:
            alert("Произошла неизвестная ошибка при определении местоположения.");
        }
      },
      {
        enableHighAccuracy: false,
        // timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const checkAddress = () => {
    if (position) {
      return JSON.stringify(position) === JSON.stringify(defaultPosition);
    }
  };

  const onSubmit = async (data: LocationData) => {
    if (address && isUser?.user_id) {
      try {
        await addUserLocation({
          lat: String(position.lat),
          long: String(position.lng),
          address: address,
          user: isUser?.user_id,
          entrance: data.entrance,
          floor: data.floor,
          apartment: data.apartment,
          comment: data.comment,
          name: data.name,
          is_active: true,
        }).unwrap();
        setOpenLocationForm(false);
        navigate("..");
      } catch (error) {
        console.error("Ошибка при добавлении адреса:", error);
        alert("Ошибка при добавлении адреса");
      }
    }
  };

  return (
    <Box>
      <Box sx={styles.mapContainer}>
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={20}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          <MoveHandler setPosition={setPosition} setAddress={setAddress} getLocation={getLocation} />
          <DragWatcher onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)} />
        </MapContainer>

        <Box sx={styles.markerAnimation}>
          {address && (
            <Box sx={styles.address}>
              {isLocating || isFetching || isDragging ? (
                <CircularProgress size={25} sx={{ color: "white" }} />
              ) : (
                address
              )}
            </Box>
          )}

          {/* Маркер */}
          <motion.div
            animate={isDragging || isFetching ? { y: [0, -6, 5, -4, 2, 0] } : { y: 0 }}
            transition={
              isDragging || isFetching ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }
            }
          >
            <img src={marker} alt="marker" style={{ width: 55, height: 55 }} />
          </motion.div>
        </Box>

        <IconButton onClick={handleGeolocate} sx={styles.nearMe}>
          <NearMeRoundedIcon />
        </IconButton>
      </Box>

      {position && !checkAddress() && (
        <Box>
          <Button
            variant="contained"
            sx={styles.submitButton}
            onClick={() => setOpenLocationForm(true)}
            disabled={isDragging || isFetching}
          >
            Подтвердить адрес
          </Button>
        </Box>
      )}

      <CustomSwipeableDrawer
        open={openLocationForm}
        onClose={() => setOpenLocationForm(false)}
        onOpen={() => setOpenLocationForm(true)}
        title="Выберите адрес"
        buttonText="Подтвердить"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LocationForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} address={address} />
      </CustomSwipeableDrawer>
    </Box>
  );
};

export default OsmMapWithAutocomplete;
