import { getLocationsQueryType } from "@store/user/api/locationApi";

export type MoveHandlerProps = {
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  getLocation: getLocationsQueryType[0];
};

export type LocationType = {
  place_id: number; // можно использовать place_id из Nominatim или fallback на index
  display_name: string;
};
