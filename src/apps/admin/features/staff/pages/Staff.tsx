import { useOutletContext } from "react-router-dom";
import { useAddStaffMutation, useGetStaffQuery, useLazyGetUserRoleQuery } from "@store/admin/api/staffApi";
import { StaffAdmin } from "../components/StaffAdmin";
import { OutletContextType } from "@/apps/client/pages";


export const StaffSettings = () => {

  const {data: vendorData} = useOutletContext<OutletContextType>()
  const { data: staffData } = useGetStaffQuery(vendorData?.id, {skip: !vendorData?.id});
  const [addStaff] = useAddStaffMutation();
  const [getRoles, {data: rolesData}] = useLazyGetUserRoleQuery()


  

  return (
    <StaffAdmin staffData={staffData} addStaff={addStaff} rolesData={rolesData} getRoles={getRoles} vendor={vendorData} />
  );
};
