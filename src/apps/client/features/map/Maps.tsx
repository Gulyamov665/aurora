import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { MoveHandler } from "./components/MoveHandler";
import { Map as LeafletMap } from "leaflet";
import { styles } from "./assets/styles";
import { motion } from "framer-motion";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
// import { LocationType } from "./types";
import marker from "@/assets/gps.png";
import DragWatcher from "./components/DragWatcher";

const defaultPosition = { lat: 39.7467565, lng: 64.4111207 };

const OsmMapWithAutocomplete = () => {
  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState("");
  // const [adressesList, setAdressesList] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  // useEffect(() => {
  //   if (address.length > 2) {
  //     handleSearch();
  //   }
  // }, [address]);

  // const handleSearch = async () => {
  //   if (!address) return;
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&countrycodes=uz`
  //     );
  //     const data = await response.json();

  //     if (data.length > 0) {
  //       // const { lat, lon } = data[0];
  //       // const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
  //       const location = data.map((loc: LocationType) => ({
  //         id: loc.place_id, // можно использовать place_id из Nominatim или fallback на index
  //         label: loc.display_name,
  //       }));
  //       setAdressesList(location);
  //       {
  //         adressesList;
  //       }
  //     } else {
  //       alert("Адрес не найден 1");
  //     }
  //   } catch (err) {
  //     console.error("Ошибка при поиске адреса:", err);
  //   }
  // };

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

  return (
    <Box>
      {/* <Autocomplete
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
      /> */}

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

            // url="https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=iLvybLngAB9MEx9SOtCp"
            // attribution="© MapTiler © OpenStreetMap contributors"
            // url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=iLvybLngAB9MEx9SOtCp"
            // attribution="© MapTiler © OpenStreetMap contributors"
            // maxZoom={22}
          />

          <MoveHandler setPosition={setPosition} setAddress={setAddress} />
          <DragWatcher onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)} />
        </MapContainer>

        <Box sx={styles.markerAnimation}>
          {!isDragging && address && (
            <Box sx={styles.address}>
              {isLocating ? <CircularProgress size={25} sx={{ color: "white" }} /> : address}
            </Box>
          )}

          {/* Маркер */}
          <motion.div
            animate={isDragging ? { y: [0, -6, 5, -4, 2, 0] } : { y: 0 }}
            transition={isDragging ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
          >
            <img
              // src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              src={marker}
              alt="marker"
              style={{ width: 55, height: 55 }}
            />
          </motion.div>
        </Box>

        <IconButton onClick={handleGeolocate} sx={styles.nearMe}>
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
