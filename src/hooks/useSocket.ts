import { useContext } from "react";
import { SocketContext } from "@/providers/SocketProvider";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    console.log("⚠️ Socket is not connected yet");
  }
  return socket;
};
