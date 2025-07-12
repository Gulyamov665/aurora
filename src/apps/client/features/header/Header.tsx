import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { UserAvatar } from "./components/Avatar";
import { useActions } from "@/hooks/useActions";
import header from "./assets/Header.module.scss";
// import newYearLogo from "@/assets/transparent_logo_new_year.png";
import LocationDropdown from "../map/components/LocationDropdown";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import { useMeQuery } from "@store/user/api/userAuthApi";
import { UserInfoType } from "@store/user/types";
import newLogo from "@/assets/aurora-new-logo.png";
import newLogoString from "@/assets/logo-string.png";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const Header: FC = () => {
  const { isUser } = useSelector(authState);
  const { data: me, isFetching } = useMeQuery(isUser?.user_id ?? 0, { skip: !isUser?.user_id });
  const { logout } = useActions();
  const breakpoint = useBreakpoint();

  return (
    <header className={`${header.header_backgroud} py-2 mb-2 header_backgroud`}>
      <div className={`${header.header_container} container`}>
        {!isUser?.is_vendor ? (
          <Link to={"."}>
            <div style={{ width: 40 }}>
              <img
                src={breakpoint === "lg" || breakpoint === "xl" ? newLogoString : newLogo}
                style={{ width: breakpoint === "lg" || breakpoint === "xl" ? 142 : 40 }}
                alt="logo"
              />
            </div>
          </Link>
        ) : (
          <div>
            <Link to={`/dashboard/${isUser.vendor}/menu`}>
              <EditOutlinedIcon color="warning" fontSize="large" />
            </Link>
          </div>
        )}
        <div>
          <LocationDropdown me={me} isUser={isUser} isLoading={isFetching} />
        </div>

        <div className={`${header.user_icon}`}>
          <UserAvatar isUser={isUser} user={me as UserInfoType} logout={logout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
