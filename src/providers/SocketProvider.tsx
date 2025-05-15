// src/providers/SocketProvider.tsx
import { createContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // const token = getToken();
    // if (!token) return;

    const newSocket = io(import.meta.env.VITE_SOCKET, {
      path: "/api-node/socket.io",
      //   auth: {
      //     token: `Bearer ${token}`,
      //   },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔌 Socket connected:");
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const contextValue = useMemo(() => socket, [socket]);

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};
