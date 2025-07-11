import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#4a148c',  // Rouge comme couleur principale
      dark: '#ba000d',
      contrastText: '#000',
    },
    secondary: {
      main: '#ff6f00', // Orange
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", sans-serif',
  },
});

export default theme;