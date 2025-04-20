import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      console.log(result.outcome);
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 50,
        left: 20,
        right: 20,
        background: "#fff",
        borderRadius: 8,
        padding: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      <p>Установите Aurora на главный экран!</p>
      <Box onClick={handleInstall}>
        <Button>Установить</Button>
      </Box>
    </div>
  );
};
