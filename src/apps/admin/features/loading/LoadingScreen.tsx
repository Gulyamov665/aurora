import { Typography, styled, Box, keyframes } from "@mui/material";
import { FC, useEffect, useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-12px) scale(1.2); opacity: 0.8; }
`;

// ОТФИЛЬТРОВАНЫЙ styled(Box), чтобы пропс не попадал в DOM
const LoaderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFadingOut",
})<{ isFadingOut: boolean }>(({ isFadingOut }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  background: "linear-gradient(135deg, rgba(200, 200, 200, 0.4), rgba(230, 230, 230, 0.6))",
  backdropFilter: "blur(8px)",
  animation: `${isFadingOut ? fadeOut : fadeIn} 0.5s ease-in-out`,
  opacity: isFadingOut ? 0 : 1,
  pointerEvents: isFadingOut ? "none" : "auto",
  transition: "opacity 0.5s ease-in-out",
  zIndex: 10,
}));

const DotsContainer = styled(Box)({
  display: "flex",
  gap: 10,
});

const Dot = styled(Box)({
  width: 18,
  height: 18,
  borderRadius: "50%",
  backgroundColor: "#1976d2",
  boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.4)",
  animation: `${bounce} 1.6s infinite ease-in-out`,
  "&:nth-of-type(2)": { animationDelay: "0.2s" },
  "&:nth-of-type(3)": { animationDelay: "0.4s" },
});

interface LoadingScreenProps {
  loading: boolean;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ loading }) => {
  const [isVisible, setIsVisible] = useState(loading);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setIsVisible(false), 500); // Ждем завершения анимации перед скрытием
    } else {
      setIsVisible(true);
    }
  }, [loading]);

  if (!isVisible) return null;

  return (
    <LoaderWrapper isFadingOut={!loading}>
      <DotsContainer>
        <Dot />
        <Dot />
        <Dot />
      </DotsContainer>
      <Typography variant="h6" fontWeight="600" mt={2} color="primary"></Typography>
    </LoaderWrapper>
  );
};
