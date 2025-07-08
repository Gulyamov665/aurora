import React, { FC } from "react";
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAvatarProps } from "../types";
import { Logout, BorderColor } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";

export const UserAvatar: FC<UserAvatarProps> = ({ isUser, logout, user }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!isUser) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      title: user?.first_name,
      icon: <MailIcon fontSize="small" />,
    },
    {
      title: "Мои заказы",
      icon: <BorderColor fontSize="small" />,
      action: () => {
        navigate("orders");
        handleCloseUserMenu();
      },
    },
    // {
    //   title: "Аккаунт",
    //   icon: <Settings fontSize="small" />,
    //   action: () => {
    //     navigate("account");
    //     handleCloseUserMenu();
    //   },
    // },
    {
      title: "Выйти",
      icon: <Logout fontSize="small" />,
      action: () => {
        logout();
        handleCloseUserMenu();
      },
    },
  ];
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={isUser?.email?.toUpperCase() ?? "User"} src={(isUser && user?.avatar) ?? ""} />
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, i) => (
          <MenuItem key={i} onClick={setting.action}>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <Typography sx={{ textAlign: "center" }}>{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
