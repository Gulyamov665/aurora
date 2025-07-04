import {
  useAddScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} from "@store/admin/api/schedulesApi";
import { useGetScheduleRestaurantQuery, useGetScheduleQuery } from "@store/admin/api/schedulesApi";
import { ScheduleList } from "../components/ScheduleList";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { MaterialModal } from "@/apps/common/Modal";
import { ScheduleEdit } from "../components/ScheduleEdit";
import { ScheduleAdd } from "../components/ScheduleAdd";
import { useDelete } from "@/hooks/useDelete";
import { useActions } from "@/hooks/useActions";

export const Schedules = () => {
  const { data: vendorData } = useOutletContext<OutletContextType>();
  const { data: getSchedules } = useGetScheduleRestaurantQuery(vendorData?.id ? { id: vendorData.id } : skipToken);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [updateSchedule] = useUpdateScheduleMutation();
  const [addSchedule] = useAddScheduleMutation();
  const { data: scheduleData } = useGetScheduleQuery(selectedScheduleId ?? skipToken);
  const [deleteSchedule] = useDeleteScheduleMutation();
  const { deleteItem, confirmedId } = useDelete();
  const { snack } = useActions();

  const handleEditClick = (id: number) => {
    setSelectedScheduleId(id);
    setOpenUpdateModal(true);
  };

  React.useEffect(() => {
    if (confirmedId) {
      deleteSchedule(confirmedId).unwrap();
      snack({ open: true, color: "warning", message: "Правило успешно удалена" });
    }
  }, [confirmedId]);
  return (
    <>
      <ScheduleList
        getSchedules={getSchedules}
        setonEditClick={handleEditClick}
        setOpenAddModal={setOpenAddModal}
        deleteItem={deleteItem}
      />

      <MaterialModal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} width="60%" minHeight={400}>
        <ScheduleEdit
          updateSchedule={updateSchedule}
          setOpenUpdateModal={setOpenUpdateModal}
          scheduleData={scheduleData}
        />
      </MaterialModal>

      <MaterialModal open={openAddModal} onClose={() => setOpenAddModal(false)} width="60%" minHeight={200}>
        <ScheduleAdd vendorData={vendorData} setOpenAddModal={setOpenAddModal} addSchedule={addSchedule} />
      </MaterialModal>
    </>
  );
};
