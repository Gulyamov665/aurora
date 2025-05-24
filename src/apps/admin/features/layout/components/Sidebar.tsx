import { FC } from "react";
import { Button, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { buttonsInfo } from "./ButtonsList";
import { SideBarProps } from "../types";
import { styles } from "../assets/styles";

const Sidebar: FC<SideBarProps> = ({ open, logout, handleSidebar }) => {
  
  return (
    <div>
      <Drawer anchor="left" open={open} onClose={handleSidebar} PaperProps={{ style: { backgroundColor: "#210638" } }}>
        <div style={{ width: 250, textAlign: "center", height: 180 }}></div>
        <List sx={{ paddingLeft: 2, height: 500 }}>
          {buttonsInfo.map(({ text, icon, link }, index) => (
            <ListItemButton
              sx={styles.listItemButton}
              alignItems="center"
              key={index}
              component={Link}
              to={link}
              onClick={handleSidebar}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <div style={{ textAlign: "center", padding: 16 }}>
          <Button variant="contained" color="error" onClick={() => logout()}>
            <strong>Выход</strong>
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
