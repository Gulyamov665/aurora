import React, { FC } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAvatarProps } from "../types";

export const UserAvatar: FC<UserAvatarProps> = ({ isUser, logout }) => {
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
      title: "Профиль",
      action: () => {
        navigate("profile");
        handleCloseUserMenu();
      },
    },
    {
      title: "Аккаунт",
      action: () => {
        navigate("account");
        handleCloseUserMenu();
      },
    },
    {
      title: "Выйти",
      action: () => {
        logout();
        handleCloseUserMenu();
      },
    },
  ];
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src={"userIcon"} />
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
        {settings.map((setting) => (
          <MenuItem key={setting.title} onClick={setting.action}>
            <Typography sx={{ textAlign: "center" }}>{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
