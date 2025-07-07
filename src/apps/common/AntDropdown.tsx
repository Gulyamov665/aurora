import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";

const items: MenuProps["items"] = [
  {
    label: " 1st menu item",
    key: "0",
  },
  {
    label: "2nd menu item",
    key: "1",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

export const AntDropdown: React.FC = () => {
  const [target, setTarget] = React.useState("Не выбран");

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const selected = items?.find((item) => item?.key === info.key);
    if (selected && "label" in selected) setTarget(selected?.label?.toString() || "");
  };
  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <Button style={{ marginLeft: 16 }}>
        {target} <DownOutlined />
      </Button>
    </Dropdown>
  );
};
