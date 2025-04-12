import { useCallback, useRef, useState } from "react";
import { GoogleMap, Libraries, LoadScriptNext, MarkerF, Autocomplete } from "@react-google-maps/api";
import { TextField, Paper } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100dvh",
};

const defaultCenter = {
  lat: 39.7467565,
  lng: 64.4111207,
};

const libraries: Libraries = ["places"];

function Map() {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef<google.maps.Map>(null);
  const [searchValue, setSearchValue] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleMapCenterChanged = useCallback(() => {
    if (mapRef.current && geocoderRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        const latLng = {
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        };
        setMapCenter(latLng);
      }
    }
  }, []);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    geocoderRef.current = new google.maps.Geocoder();
  };

  const onDragEnd = () => {
    geocoderRef?.current?.geocode({ location: mapCenter }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        console.log(results, "results");
        const preferredResult = results.find(
          (r) =>
            r.types.includes("street_address") ||
            r.types.includes("route") ||
            r.types.includes("premise") ||
            r.types.includes("locality")
        );

        setSearchValue(preferredResult?.formatted_address || results[0].formatted_address);
      }
    });
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Ваш браузер не поддерживает Geolocation API.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        console.log(currentPosition);
      },
      (error) => {
        alert("Не удалось получить местоположение: " + error.message);
      }
    );
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCurrentPosition(newCenter);
        setMapCenter(newCenter);
        mapRef.current?.panTo(newCenter);
        setSearchValue(place.formatted_address || "");
      }
    }
  };

  const mapOptions = {
    scrollwheel: true, // Включить скролл колесиком мыши
    disableDefaultUI: false, // Показать стандартные элементы управления
    zoomControl: true, // Включить элементы управления зумом
    scaleControl: true,
    streetViewControl: false, // Отключаем уличный вид для мобильных устройств
    fullscreenControl: false, // Отключаем полноэкранный режим на мобильных устройствах
    disableDoubleClickZoom: true, // Отключаем зумирование на двойной клик
    gestureHandling: "greedy",
  };

  console.log(mapCenter);

  return (
    <div>
      <LoadScriptNext googleMapsApiKey={apiKey} libraries={libraries}>
        <div style={{ position: "relative" }}>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1000,
                width: 300,
                p: 1,
              }}
            >
              <TextField
                fullWidth
                label="Введите адрес"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Paper>
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={16}
            onLoad={handleMapLoad}
            options={mapOptions}
            onCenterChanged={handleMapCenterChanged}
            onDragEnd={onDragEnd}
          >
            <MarkerF position={mapCenter} />
          </GoogleMap>
          <button
            onClick={handleGeolocation}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1000,
              padding: "10px",
              background: "#e7e7e7",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              boxShadow: "0px 0px 10px 0px gray",
            }}
          >
            Определить местоположение
          </button>
        </div>
      </LoadScriptNext>
    </div>
  );
}

export default Map;
