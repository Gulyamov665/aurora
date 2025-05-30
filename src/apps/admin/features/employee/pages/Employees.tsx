import { useOutletContext } from "react-router-dom";
import { useAddStaffMutation, useGetStaffQuery, useLazyGetUserRoleQuery } from "@store/admin/api/staffApi";
import { EmployeeMain } from "../components/EmployeeMain";
import { OutletContextType } from "@/apps/client/pages";

export const Employees = () => {
  const { data: vendorData } = useOutletContext<OutletContextType>();
  const { data: staffData } = useGetStaffQuery(vendorData?.id, { skip: !vendorData?.id });
  const [addStaff] = useAddStaffMutation();
  const [getRoles, { data: rolesData }] = useLazyGetUserRoleQuery();

  return (
    <EmployeeMain
      staffData={staffData}
      addStaff={addStaff}
      rolesData={rolesData}
      getRoles={getRoles}
      vendor={vendorData}
    />
  );
};
