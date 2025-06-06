import { useMap } from "react-leaflet";
import { useEffect } from "react";

export const DragWatcher = ({ onDragStart, onDragEnd }: any) => {
  const map = useMap();

  useEffect(() => {
    map.on("dragstart", onDragStart);
    map.on("dragend", onDragEnd);

    return () => {
      map.off("dragstart", onDragStart);
      map.off("dragend", onDragEnd);
    };
  }, [map, onDragStart, onDragEnd]);

  return null;
};


