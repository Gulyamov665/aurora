import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { UserAvatar } from "./components/Avatar";
import { useActions } from "@/hooks/useActions";
import header from "./assets/Header.module.scss";
import newYearLogo from "@/assets/transparent_logo_new_year.png";
import LocationDropdown from "../map/components/LocationDropdown";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import { useMeQuery } from "@store/user/api/userAuthApi";
import { UserInfoType } from "@store/user/types";

const Header: FC = () => {
  const { isUser } = useSelector(authState);
  const { data: me, isFetching } = useMeQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });
  const { logout } = useActions();

  return (
    <header className={`${header.header_backgroud} py-2 mb-2 header_backgroud`}>
      <div className={`${header.header_container} container`}>
        {!isUser?.is_vendor ? (
          <Link to={"."}>
            <div>
              <img src={newYearLogo} style={{ width: 32 }} alt="logo" />
            </div>
          </Link>
        ) : (
          <div>
            <Link to={`/dashboard/${isUser.vendor}/menu`}>
              <EditOutlinedIcon color="warning" fontSize="large" />
            </Link>
          </div>
        )}
        <LocationDropdown me={me} isUser={isUser} isLoading={isFetching} />

        <div className={`${header.user_icon}`}>
          <UserAvatar isUser={isUser} user={me as UserInfoType} logout={logout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
