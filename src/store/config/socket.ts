import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET, {
      path: "/api-node/socket.io",
      //   auth: { token: `Bearer ${token}` },
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
