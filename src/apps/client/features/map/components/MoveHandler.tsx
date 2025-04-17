import axios from "axios";
import { useMap, useMapEvents } from "react-leaflet";
import { NominatimReverseResponse } from "../types";

export const MoveHandler = ({ setPosition, setAddress }: any) => {
  const map = useMap();

  useMapEvents({
    moveend: async () => {
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;
      setPosition({ lat, lng });

      try {
        const { data } = await axios.get<NominatimReverseResponse>("https://nominatim.openstreetmap.org/reverse", {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
        });
        setAddress(data.display_name || "Адрес не найден");
      } catch {
        setAddress("Ошибка при получении адреса");
      }
    },
  });

  return null;
};
