import axios from "axios";
import { useMap, useMapEvents } from "react-leaflet";
import { MoveHandlerProps, NominatimReverseResponse } from "../types";
import React from "react";

export const MoveHandler: React.FC<MoveHandlerProps> = ({ setPosition, setAddress }: any) => {
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
        console.log(data);
        setAddress(
          `${data.address?.road || ""} ${data.address?.house_number || data.address?.amenity || data.address?.neighbourhood}` ||
            "Адрес не найден"
        );
      } catch {
        setAddress("Ошибка при получении адреса");
      }
    },
  });

  return null;
};
