import { UserInfoType, UserLocationResponseType } from "@store/user/types";
import { useState, FC } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IsUser } from "../../header/types";
import { CircularProgress } from "@mui/material";

type LocationDropdownProps = {
  me: UserInfoType | undefined;
  isUser: Partial<IsUser> | null;
  isLoading: boolean;
  locationList?: UserLocationResponseType[];
};

const LocationDropdown: FC<LocationDropdownProps> = ({ locationList, me, isUser, isLoading }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  const handleSelect = (eventKey: string | null) => {
    console.log(selectedItem);
    if (eventKey === "newLocation") {
      return navigate("maps");
    }
    if (eventKey) setSelectedItem(eventKey);
    console.log(`Selected item: ${eventKey}`);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdownStyle">
        {isLoading && <CircularProgress size={25} sx={{ color: "white" }} />}
        {(!isLoading && isUser && me?.location?.entrance) || "Указать локацию"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdownStyle">
        {locationList?.map((item) => (
          <Dropdown.Item key={item.id} eventKey={item.id}>
            {item.entrance}
          </Dropdown.Item>
        ))}

        <Dropdown.Item eventKey={"newLocation"}>Добавить локацию</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LocationDropdown;
