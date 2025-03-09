import { useState, useEffect, FC } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "@store/user/slices/authSlice";
import header from "./assets/Header.module.scss";
import newYearLogo from "@/assets/transparent_logo_new_year.png";
import LocationDropdown from "../map/components/LocationDropdown";
import userIcon from "@/assets/user-icon.png";

interface CustomJwtPayload extends JwtPayload {
  vendor: string;
}

const Header: FC = () => {
  const [authTokens] = useState(() => {
    const authTokens = localStorage.getItem("authTokens");
    return authTokens ? JSON.parse(authTokens) : null;
  });
  const [vendor, setVendor] = useState<string>("");
  const { isUser } = useSelector(authState);

  useEffect(() => {
    if (authTokens) {
      setVendor(jwtDecode<CustomJwtPayload>(authTokens.access).vendor);
    } else {
      setVendor("");
    }
  }, [authTokens]);

  const items = [
    { id: 1, name: "item1" },
    { id: 2, name: "item2" },
    { id: 3, name: "item2" },
    { id: 4, name: "item2" },
  ];

  return (
    <header className={`${header.header_backgroud} py-2 mb-2 header_backgroud`}>
      <div className={`${header.header_container} container`}>
        {!vendor ? (
          <Link to={"."}>
            <div>
              <img src={newYearLogo} style={{ width: 32 }} alt="logo" />
            </div>
          </Link>
        ) : (
          <div>
            <Link to={`/admin/${vendor}/menu`}>
              <button className={header.btn_edit}>Редактировать</button>
            </Link>
          </div>
        )}
        <LocationDropdown items={items} />
        {!isUser?.is_user && (
          <Link to={{ pathname: "/login" }} state={{ from: location.pathname }}>
            <div className={`${header.user_icon}`}>
              <img src={userIcon} alt="" width={30} height={30} />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
