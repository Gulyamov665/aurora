import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { ListEmployee } from "./ListEmployee";
import { EmployeeAdd } from "./EmployeeAdd";
import { StaffAdminProps } from "../types";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

export const EmployeeMain: React.FC<StaffAdminProps> = ({ staffData, addStaff, rolesData, getRoles, vendor }) => {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <>
      <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab icon={<FolderSharedIcon />} iconPosition="start" label="Список" />
          <Tab icon={<PersonAddAltIcon />} iconPosition="start" label="Добавить" />
        </Tabs>

        {tab === 0 && <ListEmployee staffData={staffData} />}

        {tab === 1 && <EmployeeAdd addStaff={addStaff} rolesData={rolesData} getRoles={getRoles} vendor={vendor} />}
      </Box>
    </>
  );
};
