import { useAddScheduleMutation, useUpdateScheduleMutation } from "@store/admin/api/schedulesApi";
import { useGetScheduleRestaurantQuery, useGetScheduleQuery } from "@store/admin/api/schedulesApi";
import { ScheduleList } from "../components/ScheduleList";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { MaterialModal } from "@/apps/common/Modal";
import { ScheduleEdit } from "../components/ScheduleEdit";
import { ScheduleAdd } from "../components/ScheduleAdd";

export const Schedules = () => {
  const { data: vendorData } = useOutletContext<OutletContextType>();
  const { data: getSchedules } = useGetScheduleRestaurantQuery(vendorData?.id ? { id: vendorData.id } : skipToken);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [updateSchedule] = useUpdateScheduleMutation();
  const [addSchedule] = useAddScheduleMutation();
  const { data: scheduleData } = useGetScheduleQuery(selectedScheduleId ?? skipToken);

  const handleEditClick = (id: number) => {
    setSelectedScheduleId(id);
    setOpenUpdateModal(true);
  };
  return (
    <>
      <ScheduleList getSchedules={getSchedules} setonEditClick={handleEditClick} setOpenAddModal={setOpenAddModal} />

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
