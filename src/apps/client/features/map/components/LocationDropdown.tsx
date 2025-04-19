import { UserInfoType } from "@store/user/types";
import { useState, FC } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IsUser } from "../../header/types";

type LocationType = {
  id: number;
  name: string;
};

type LocationDropdownProps = {
  items: LocationType[];
  me: UserInfoType | undefined;
  isUser: Partial<IsUser> | null;
};

const LocationDropdown: FC<LocationDropdownProps> = ({ items, me, isUser }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  const handleSelect = (eventKey: string | null) => {
    if (eventKey === "newLocation") {
      return navigate("maps");
    }
    if (eventKey) setSelectedItem(eventKey);
    console.log(`Selected item: ${eventKey}`);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdownStyle">
        {(isUser && me?.location.entrance) || "Указать локацию"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {items.map((item) => (
          <Dropdown.Item key={item.id} eventKey={item.id}>
            {item.name}
          </Dropdown.Item>
        ))}

        <Dropdown.Item eventKey={"newLocation"}>Добавить локацию</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LocationDropdown;
