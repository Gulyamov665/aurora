import { Box } from "@mui/material";
import React, { RefObject } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

type EnableSoundButtonProps = {
  audioRef?: RefObject<HTMLAudioElement | null>;
  setSoundAllowed: (value: boolean) => void;
  soundAllowed: boolean;
};

const EnableSoundButton: React.FC<EnableSoundButtonProps> = ({ audioRef, setSoundAllowed, soundAllowed }) => {
  const turnOn = () => {
    if (audioRef?.current) {
      audioRef.current
        .play()
        .then(() => {
          setSoundAllowed(true);
        })
        .catch((err) => {
          console.warn("User interaction required to play audio", err);
        });
    }
  };

  const turnOff = () => {
    if (audioRef?.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSoundAllowed(false);
    }
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "center", cursor: "pointer" }}>
      {soundAllowed ? (
        <VolumeUpIcon fontSize="large" color="secondary" onClick={turnOff} />
      ) : (
        <VolumeOffIcon color="error" fontSize="large" onClick={turnOn} />
      )}
    </Box>
  );
};

export default EnableSoundButton;
