import { AddScheduleMutationType, GetScheduleQueryType, GetScheduleRestaurantQueryType, UpdateScheduleMutationType } from "@store/admin/api/schedulesApi";
import { VendorInfoType } from "@store/user/types";

export interface IScheduleFormType {
  id: number;
  restaurant: number;
  day: number;
  open_time: string;
  close_time: string;
}

export interface ScheduleListProps {
  getSchedules: GetScheduleRestaurantQueryType[0];
  setonEditClick: (id: number) => void;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ScheduleEditProps {
  updateSchedule: UpdateScheduleMutationType[0]
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleData: GetScheduleQueryType[0]

}

export interface SchedulesAddProps {
  vendorData: VendorInfoType;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  addSchedule: AddScheduleMutationType[0]
}
