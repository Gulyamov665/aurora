import { useState, useEffect, FC } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Link } from "react-router-dom";
import header from "../static/Header.module.scss";
// import logo from '../../../assets/transparent_logo.png'
import newYearLogo from "../../../assets/transparent_logo_new_year.png";

import LocationDropdown from "./LocationDropdown";
import userIcon from "../../../assets/user-icon.png";

interface CustomJwtPayload extends JwtPayload {
  vendor: string;
}

const Header: FC = () => {
  const [authTokens] = useState(() => {
    const authTokens = localStorage.getItem("authTokens");
    return authTokens ? JSON.parse(authTokens) : null;
  });
  const [vendor, setVendor] = useState<string>("");

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
          <div>
            <img src={newYearLogo} style={{ width: 32 }} alt="logo" />
          </div>
        ) : (
          <div>
            <Link to={`/admin/${vendor}/menu`}>
              <button className={header.btn_edit}>Редактировать</button>
            </Link>
          </div>
        )}
        <LocationDropdown items={items} />
        <Link to={{ pathname: "/login" }} state={{ from: location.pathname }}>
          <div className={`${header.user_icon}`}>
            <img src={userIcon} alt="" width={30} height={30} />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
