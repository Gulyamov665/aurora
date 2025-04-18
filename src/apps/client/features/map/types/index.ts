export interface NominatimReverseResponse {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    house_number?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    amenity?: string;
    neighbourhood: string;
  };
}

export type MoveHandlerProps = {
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

export type LocationType = {
  place_id: number; // можно использовать place_id из Nominatim или fallback на index
  display_name: string;
};
