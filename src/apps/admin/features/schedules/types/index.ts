import { GetScheduleRestaurantQueryType } from "@store/admin/api/schedulesApi";
import { Control } from "react-hook-form";



export interface ScheduleListProps {
  getSchedules: GetScheduleRestaurantQueryType[0];
    setonEditClick: (id: number) => void;
}

export interface ScheduleEditProps {
    control: Control<any>;
}