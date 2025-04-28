import React from "react";
import { SelectorContentProps } from "../types";
import { LocationForm } from "./LocationForm";
import { LocationList } from "./LocationList";
import { IsGuestFrame } from "@/apps/common/IsGuestFrame";

export const SelectorContent: React.FC<SelectorContentProps> = ({
  isUser,
  editTargetId,
  register,
  name,
  address,
  watch,
  removeLoc,
  locationList,
  onLocationClick,
  isLoading,
  changingId,
  setEditTargetId,
  navigate,
}) => {
  const renderContent = () => {
    switch (true) {
      case !isUser?.user_id:
        return (
          <IsGuestFrame
            goToLogin={() => navigate("/login", { state: { from: location.pathname } })}
            goToRegister={() => navigate("/register", { state: { from: location.pathname } })}
            text="Для выбора адреса необходимо войти в систему или зарегистрироваться."
          />
        );
      case Boolean(editTargetId):
        return (
          <LocationForm
            register={register}
            address={name || address}
            back={() => setEditTargetId(0)}
            watch={watch}
            remove={removeLoc}
          />
        );
      default:
        return (
          <LocationList
            locationList={locationList}
            onLocationClick={onLocationClick}
            isLoading={isLoading}
            changingId={changingId}
            setEditMode={setEditTargetId}
          />
        );
    }
  };
  return renderContent();
};
