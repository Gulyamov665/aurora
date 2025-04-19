import axios from "axios";
import { useMap, useMapEvents } from "react-leaflet";
import { MoveHandlerProps, NominatimReverseResponse } from "../types";
import React from "react";

export const MoveHandler: React.FC<MoveHandlerProps> = ({ setPosition, setAddress }: any) => {
  const map = useMap();

  const formatAddress = (address: NominatimReverseResponse["address"]) => {
    const parts = [address?.road, address?.house_number, address?.amenity, address?.neighbourhood, address?.suburb];
    // Оставим только непустые значения
    const validParts = parts.filter(Boolean);
    return validParts.length > 0 ? validParts.join(", ") : address?.city;
  };

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
        setAddress(formatAddress(data.address));
      } catch {
        setAddress("Ошибка при получении адреса попробуйте повторить");
      }
    },
  });

  return null;
};
