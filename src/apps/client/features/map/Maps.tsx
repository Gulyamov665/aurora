import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Autocomplete, Box, IconButton, TextField, Typography } from "@mui/material";
import { MoveHandler } from "./components/MoveHandler";
import { Map as LeafletMap } from "leaflet";
import { styles } from "./assets/styles";
import { motion } from "framer-motion";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import { LocationType } from "./types";

const defaultPosition = { lat: 39.7467565, lng: 64.4111207 };

const OsmMapWithAutocomplete = () => {
  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState("");
  const [adressesList, setAdressesList] = useState<string[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);

  const MotionTypography = motion.create(Typography);

  useEffect(() => {
    if (address.length > 2) {
      handleSearch();
    }
  }, [address]);

  const handleSearch = async () => {
    if (!address) return;
    try {
      const response = await fetch(
        // `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&countrycodes=uz`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
        const location = data.map((loc: LocationType) => ({
          id: loc.place_id, // можно использовать place_id из Nominatim или fallback на index
          label: loc.display_name,
        }));
        setAdressesList(location);
      } else {
        alert("Адрес не найден");
      }
    } catch (err) {
      console.error("Ошибка при поиске адреса:", err);
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается в вашем браузере.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = { lat: latitude, lng: longitude };
        setPosition(newPos);

        if (mapRef.current) {
          mapRef.current.setView([newPos.lat, newPos.lng], 18);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        if (error.code === 1) {
          alert("Вы отклонили доступ к геолокации. Разрешите его в настройках браузера.");
        } else if (error.code === 2) {
          alert("Не удалось определить местоположение. Проверьте подключение к интернету.");
        } else if (error.code === 3) {
          alert("Тайм-аут при попытке получить местоположение.");
        } else {
          alert("Ошибка получения геолокации.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Box p={2}>
      <Autocomplete
        disablePortal
        fullWidth
        onChange={(_, newValue) => setAddress(newValue || "")}
        options={adressesList}
        sx={{ width: 300 }}
        getOptionLabel={(option: any) => option.label}
        renderOption={(props: any, option: any) => (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Location" value={address} onChange={(e) => setAddress(e.target.value)} />
        )}
        freeSolo
      />

      <Box sx={styles.mapContainer}>
        {/* Карта */}
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
          <MoveHandler setPosition={setPosition} setAddress={setAddress} />
        </MapContainer>

        {/* Маркер по центру */}
        <Box sx={styles.marker}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="marker"
            style={{ width: 35, height: 35 }}
          />
        </Box>

        {address && (
          <MotionTypography
            sx={styles.address}
            initial={{ padding: "10px 18px", fontSize: "16px", opacity: 0.8 }}
            animate={{ padding: "8px 16px", fontSize: "16px", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {address}
          </MotionTypography>
        )}
        <IconButton
          onClick={handleGeolocate}
          sx={{
            position: "absolute",
            bottom: 70,
            right: 16,
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <NearMeRoundedIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Координаты: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
      </Typography>
    </Box>
  );
};

export default OsmMapWithAutocomplete;
