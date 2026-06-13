import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e6bb8',
      light: '#e8f2fb',
      dark: '#155a9c',
    },
    background: {
      default: '#eef1f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280',
    },
    divider: '#e0e4e8',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#4b5563',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e0e4e8',
        },
      },
    },
  },
});

export const layout = {
  drawerWidth: 300,
  drawerCollapsedWidth: 72,
} as const;
