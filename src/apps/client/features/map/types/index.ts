import { getLocationsQueryType } from "@store/user/api/locationApi";
import { IsUserType, UserLocationResponseType } from "@store/user/types";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

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

export type LocationData = {
  address?: string;
  house?: string;
  apartment?: string;
  floor?: string;
  entrance: string;
  comment?: string;
  name?: string;
  street?: string;
  phone?: string;
};

export type LocationFormType = {
  register: UseFormRegister<LocationData>;
  handleSubmit?: UseFormHandleSubmit<LocationData>;
  onSubmit?: SubmitHandler<LocationData>;
  watch?: UseFormWatch<LocationData>;
  address?: string;
  back?: () => void;
  remove?: () => void;
  navbox?: boolean;
  p?: number;
  disabled?: boolean;
};

export type LocationListType = {
  locationList: UserLocationResponseType[] | undefined;
  onLocationClick: (locationId: number) => Promise<void>;
  isLoading: boolean;
  changingId: number;
  setEditMode: React.Dispatch<React.SetStateAction<number>>;
};

export type SelectorContentProps = {
  isUser: Partial<IsUserType> | null;
  editTargetId: number;
  register: UseFormRegister<LocationData>;
  name?: string;
  address?: string;
  watch: UseFormWatch<LocationData>;
  removeLoc: () => void;
  locationList?: UserLocationResponseType[];
  onLocationClick: (locationId: number) => Promise<void>;
  isLoading: boolean;
  changingId: number;
  setEditTargetId: React.Dispatch<React.SetStateAction<number>>;
  navigate: NavigateFunction;
};
