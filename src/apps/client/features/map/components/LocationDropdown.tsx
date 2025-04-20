import { UserInfoType, UserLocationResponseType } from "@store/user/types";
import { FC } from "react";
import { IsUser } from "../../header/types";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useActions } from "@/hooks/useActions";
import { styles } from "../assets/styles";

type LocationDropdownProps = {
  me: UserInfoType | undefined;
  isUser: Partial<IsUser> | null;
  isLoading: boolean;
  locationList?: UserLocationResponseType[];
};

const LocationDropdown: FC<LocationDropdownProps> = ({ me, isUser, isLoading }) => {
  const { AddressSelectorToggle } = useActions();

  return (
    <Button variant="contained" fullWidth onClick={() => AddressSelectorToggle(true)} sx={styles.locationButton}>
      {isLoading && <CircularProgress size={25} sx={{ color: "white" }} />}
      <Typography noWrap>
        {(!isLoading && isUser && me?.location?.name) || me?.location?.address || "Указать локацию"}
      </Typography>
    </Button>
  );
};

export default LocationDropdown;
