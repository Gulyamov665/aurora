import { FC, useState } from "react";
import { Drawer } from "@mui/material";
import { SideBarProps } from "../types";
import { buttonGroups } from "../components/ButtonsList"; // см. ниже структуру
import { SidebarLogo } from "../components/SidebarHeader";
import { SidebarSection } from "../components/SidebarSection";
import { SidebarFooter } from "../components/SidebarFooter";


const Sidebar: FC<SideBarProps> = ({ open, logout, handleSidebar }) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const handleGroupToggle = (title: string) => {
    setOpenGroup((prev) => (prev === title ? null : title));
  };

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={open}
      onClose={handleSidebar}
      PaperProps={{
        sx: {
          bgcolor: "#210638",
          width: 250,
          display: "flex",
          flexDirection: "column",
        },

      }}
    >
      <SidebarLogo />

      <SidebarSection
        buttonGroups={buttonGroups}
        openGroup={openGroup}
        handleGroupToggle={handleGroupToggle}
        handleSidebar={handleSidebar}
      />

      <SidebarFooter logout={logout} />
      
    </Drawer>
  );
};

export default Sidebar;
