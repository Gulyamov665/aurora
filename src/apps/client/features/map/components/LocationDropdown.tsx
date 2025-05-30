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
    <>
      <Button variant="contained" fullWidth onClick={() => AddressSelectorToggle(true)} sx={styles.locationButton}>
        <Typography noWrap alignItems={"center"} display={"flex"} fontWeight={300}>
          {isLoading && <CircularProgress size={24} color="warning" />}

          {!isLoading && (
            <span>
              {(!!isUser?.user_id && me?.location?.name) ||
                (!!isUser?.user_id && me?.location?.address) ||
                "Указать локацию"}
            </span>
          )}
        </Typography>
      </Button>
    </>
  );
};

export default LocationDropdown;
