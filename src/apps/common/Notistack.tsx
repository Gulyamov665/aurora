import { SnackbarProvider, useSnackbar } from 'notistack';
import { Alert, AlertColor } from '@mui/material';
import Slide from '@mui/material/Slide';

let useSnackbarRef: ReturnType<typeof useSnackbar>;

export const snack = {
  success(msg: string) {
    showAlert(msg, 'success');
  },
  error(msg: string) {
    showAlert(msg, 'error');
  },
  info(msg: string) {
    showAlert(msg, 'info');
  },
  warning(msg: string) {
    showAlert(msg, 'warning');
  },
};

function showAlert(message: string, severity: AlertColor) {
  useSnackbarRef.enqueueSnackbar('', {
    content: (key) => (
      <Alert
        onClose={() => useSnackbarRef.closeSnackbar(key)}
        severity={severity}
        variant="standard"
        sx={{
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
          fontSize: '0.95rem',
          alignItems: 'center',
        }}
      >
        {message}
      </Alert>
    ),
  });
}

function SnackbarInitializer() {
  useSnackbarRef = useSnackbar();
  return null;
}

export default function AppSnackbar() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <SnackbarInitializer />
    </SnackbarProvider>
  );
}