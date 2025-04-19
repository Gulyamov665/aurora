// import axios from "axios";
import { useMap, useMapEvents } from "react-leaflet";
import { MoveHandlerProps } from "../types";
import React from "react";

export const MoveHandler: React.FC<MoveHandlerProps> = ({ setPosition, setAddress, getLocation }: any) => {
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
      // try {
      //   getLocation({ lat, lon: lng });
      // } catch {
      //   setAddress("Ошибка при получении адреса попробуйте повторить");
      // }
    },
  });

  return null;
};
