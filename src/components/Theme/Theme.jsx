import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#D0BEA2',
      light: '#CEBB9E',
    },
    secondary: {
      main: '#a34a6d',
    },
    background: {
      default: '#DAD3C8',
      paper: '#ffffff',
    },
    text: {
      primary: '#262525',
      secondary: '#3F6900',
      disabled: '#DAD3C8',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3e3737',
      light: '#CEBB9E',
      contrastText: '#D0BEA2',
    },
    secondary: {
      main: '#a34a6d',
    },
    background: {
      default: '#2e2926',
      paper: '#6e534d',
    },
    text: {
      primary: '#D0BEA2',
      secondary: '#DAD3C8',
      disabled: '#DAD3C8',
    },
  },
});
