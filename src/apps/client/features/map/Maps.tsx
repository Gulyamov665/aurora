import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { MoveHandler } from "./components/MoveHandler";
import { Map as LeafletMap } from "leaflet";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";

const defaultPosition = { lat: 39.7467565, lng: 64.4111207 };

const OsmMapWithAutocomplete = () => {
  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState("");
  const mapRef = useRef<LeafletMap | null>(null);

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
        alert("Не удалось получить ваше местоположение.");
      }
    );
  };

  return (
    <Box p={2}>
      <TextField
        label="Адрес (автообновляется при перемещении карты)"
        fullWidth
        value={address}
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />

      <Box sx={{ height: "500px", width: "100%", position: "relative" }}>
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            zIndex: 999,
            pointerEvents: "none",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="marker"
            style={{ width: 35, height: 35 }}
          />
        </Box>
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
