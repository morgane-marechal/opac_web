import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#2A5C8D', 
      main: '#2A5C8D',  // Bleu Profond
      dark: '#ba000d',
      contrastText: '#000',
    },
    secondary: {
      main: '#4B8F8C', // Vert sage
    },
    tertiary: {
      main:'#A98E36'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    }
  },
  typography: {
    fontFamily: '"Mulish", "Roboto", sans-serif',
    h1: {
      color: 'grey.900', // Gris le plus foncé
    },
    h2: {
      color: 'grey.800',
    },
    body1: {
      color: 'grey.600',
    },
    body2: {
      color: 'grey.500',
    },
    caption: {
      color: 'grey.500',
    },
    overline: {
      color: 'grey.400',
    },
    lightgrey: {
      color: 'grey.A700'
    }

  },
});

export default theme;