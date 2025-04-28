import { Box, Typography, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const bounceAnimation = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const AnimatedCheck = styled(CheckCircleIcon)`
  animation: ${bounceAnimation} 0.8s ease-in-out;
  color: #4CAF50;
  font-size: 120px;
`;

const OrderSuccess = () => (
  <Fade in={true} timeout={500}>
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 1000,
      }}
    >
      <AnimatedCheck />
      <Typography 
        variant="h5" 
        sx={{ 
          mt: 2,
          opacity: 0,
          animation: 'fadeIn 0.5s ease-in forwards',
          animationDelay: '0.5s',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        Заказ успешно оформлен!
      </Typography>
    </Box>
  </Fade>
);

export default OrderSuccess;