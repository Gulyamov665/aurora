import {
  useGetScheduleQuery,
  useGetScheduleRestaurantQuery,
  useUpdateScheduleMutation,
} from "@store/admin/api/schedulesApi";
import { ScheduleList } from "../components/ScheduleList";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { MaterialModal } from "@/apps/common/Modal";
import { ScheduleEdit } from "../components/ScheduleEdit";
import { FormProvider, useForm } from "react-hook-form";

export const Schedules = () => {
  const { data } = useOutletContext<OutletContextType>();
  const { data: getSchedules } = useGetScheduleRestaurantQuery(data?.id ? { id: data.id } : skipToken);
  const [openModal, setOpenModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const { data: schedule, isLoading } = useGetScheduleQuery(selectedScheduleId ?? skipToken);
  const [updateSchedule] = useUpdateScheduleMutation();

  const methods = useForm({
    defaultValues: {
      day: "",
      open_time: "",
      close_time: "",
    },
  });

  useEffect(() => {
    if (schedule) {
      methods.reset();
    }
  }, [schedule]);

const handleEditClick = (id: number) => {
  setSelectedScheduleId(id);
  setOpenModal(true);
};

const onSubmit = async (formData: any) => {
  try {
    console.log(formData)
    // await updateSchedule({
    //   id: schedule.id, // конкретный ID записи!
    //   body: formData,
    // }).unwrap();
    alert("График обновлён!");
  } catch (err) {
    console.error(err);
    alert("Ошибка обновления");
  }
};

  return (
    <>
      <ScheduleList getSchedules={getSchedules} setonEditClick={handleEditClick} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MaterialModal open={openModal} onClose={() => setOpenModal(false)} width="60%" minHeight={400}>
            <ScheduleEdit control={methods.control} />
          </MaterialModal>
        </form>
      </FormProvider>
    </>
  );
};
