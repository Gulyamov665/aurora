import { Wait } from "@/animations/componets/Wait";
import React from "react";

export const ProfilePage: React.FC = () => {
  return (
    <div>
      <Wait size={300} />
      <p style={{ textAlign: "center", fontWeight: 800 }}>В процессе разработки</p>
    </div>
  );
};
