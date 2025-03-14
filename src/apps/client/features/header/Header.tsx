import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import { UserAvatar } from "./components/Avatar";
import header from "./assets/Header.module.scss";
import newYearLogo from "@/assets/transparent_logo_new_year.png";
import LocationDropdown from "../map/components/LocationDropdown";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import { useActions } from "@/hooks/useActions";

const Header: FC = () => {
  const { isUser } = useSelector(authState);
  const { logout } = useActions();

  const items = [
    { id: 1, name: "item1" },
    { id: 2, name: "item2" },
    { id: 3, name: "item2" },
    { id: 4, name: "item2" },
  ];

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
            <Link to={`/admin/${isUser.vendor}/menu`}>
              <EditOutlinedIcon color="warning" fontSize="large" />
            </Link>
          </div>
        )}
        <LocationDropdown items={items} />

        <div className={`${header.user_icon}`}>
          <UserAvatar isUser={isUser} logout={logout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
