import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { modals } from "@store/appSlice";
import { useActions } from "@/hooks/useActions";
import { useDeleteUserLocationMutation, useGetUserLocationByIdQuery } from "@store/user/api/userLocationApi";
import { useUpdateUserLocationMutation, useToggleActiveLocationMutation } from "@store/user/api/userLocationApi";
import { authState } from "@store/user/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { CustomSwipeableDrawer } from "@/apps/common/CustomSwipeableDrawer";
import { LocationList } from "./LocationList";
import { LocationForm } from "./LocationForm";
import { useForm } from "react-hook-form";
import { LocationData } from "../types";
import { useDelete } from "@/hooks/useDelete";

export const AddressSelector: React.FC = () => {
  const { isUser } = useSelector(authState);
  const { addressSelector } = useSelector(modals);
  const { AddressSelectorToggle } = useActions();
  const { data: locationList } = useGetUserLocationByIdQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });
  const { register, reset, watch, handleSubmit } = useForm<LocationData>();
  const [toogleActive, { isLoading }] = useToggleActiveLocationMutation();
  const [updateUserLocation, { isLoading: updateLoading }] = useUpdateUserLocationMutation();
  const [removeLocation] = useDeleteUserLocationMutation();
  const [editTargetId, setEditTargetId] = useState(0);
  const [changingId, setChangingId] = useState(0);
  const { deleteItem, confirmedId } = useDelete();
  const { name, address } = watch();

  const navigate = useNavigate();

  useEffect(() => {
    if (locationList?.length) {
      const activeLocation = locationList.find((location) => location.id === editTargetId);
      if (activeLocation) reset({ ...activeLocation });
    }
    if (confirmedId) {
      removeLocation(confirmedId).unwrap();
      setEditTargetId(0);
    }
  }, [editTargetId, locationList, reset, confirmedId]);

  const removeLoc = () => {
    deleteItem({ message: "удалить локацию ?", type: "location", id: editTargetId });
  };

  const navigateToMaps = () => {
    navigate("maps");
    AddressSelectorToggle(false);
  };

  const onLocationClick = async (locationId: number) => {
    if (isUser?.user_id) {
      setChangingId(locationId);
      await toogleActive(locationId).unwrap();
    }
  };

  const onChangeSubmit = async (data: LocationData) => {
    if (isUser?.user_id) {
      await updateUserLocation({ id: editTargetId, body: data }).unwrap();
      setEditTargetId(0);
    }
  };

  return (
    <Box>
      <CustomSwipeableDrawer
        open={addressSelector}
        onClose={() => AddressSelectorToggle(false)}
        onOpen={() => AddressSelectorToggle(true)}
        onSubmit={editTargetId ? handleSubmit(onChangeSubmit) : navigateToMaps}
        title="Выберите адрес"
        buttonText={editTargetId ? "Изменить" : "Указать адрес"}
        loading={updateLoading}
      >
        {editTargetId ? (
          <LocationForm
            register={register}
            address={name || address}
            back={() => setEditTargetId(0)}
            watch={watch}
            remove={removeLoc}
          />
        ) : (
          <LocationList
            locationList={locationList}
            onLocationClick={onLocationClick}
            isLoading={isLoading}
            changingId={changingId}
            setEditMode={setEditTargetId}
          />
        )}
      </CustomSwipeableDrawer>
    </Box>
  );
};
