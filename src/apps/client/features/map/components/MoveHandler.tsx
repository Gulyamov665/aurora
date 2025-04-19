import { useMap, useMapEvents } from "react-leaflet";
import { MoveHandlerProps } from "../types";
import React from "react";

export const MoveHandler: React.FC<MoveHandlerProps> = ({ setPosition, getLocation }: any) => {
  const map = useMap();

  const handleGetLocation = async (lat: number, lng: number) => {
    await getLocation({ lat, lon: lng }).unwrap();
  };

  useMapEvents({
    moveend: async () => {
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;
      setPosition({ lat, lng });
      handleGetLocation(lat, lng);
    },
  });

  return null;
};
