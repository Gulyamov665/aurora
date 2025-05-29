import { Box } from '@mui/material'
import aurora_logo from "@/assets/transparent_logo.png";

export const SidebarLogo = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="15%">
        <Box
          component="img"
          src={aurora_logo}
          alt="logo"
          sx={{ width: 150 }}
        />
      </Box>
  )
}
