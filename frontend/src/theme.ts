import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['var(--font-nunito-sans)', 'Arial', 'sans-serif'].join(','),
    h1: { fontFamily: 'var(--font-dosis-sans), Arial, sans-serif' },
    h2: { fontFamily: 'var(--font-dosis-sans), Arial, sans-serif' },
    h3: { fontFamily: 'var(--font-dosis-sans), Arial, sans-serif' },
    h4: { fontFamily: 'var(--font-dosis-sans), Arial, sans-serif' },
    h5: { fontFamily: 'var(--font-dosis-sans), Arial, sans-serif' },
    h6: { fontFamily: 'var(--font-dosis-sans), Arial, sans-serif' },
  },
});

export default theme;
