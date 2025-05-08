import { createTheme } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
      },
  palette: {
    primary: {
      main: 'rgb(103, 58, 183)',
    },
    secondary: {
      main: 'rgb(33, 150, 243)',
    },
  },
});

export default theme;
