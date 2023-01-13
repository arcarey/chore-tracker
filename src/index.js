import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const theme = createTheme({
    palette: {
    type: 'light',
    primary: {
      main: '#64789B',
      light: 'rgba(131,147,175,0.51)',
      transparent: 'rgba(166,177,185,0.27)'
    },
    secondary: {
      main: 'rgba(155,135,100,0.53)',
    },
  },
})



import store from './redux/store';

import App from './components/App/App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>,
  document.getElementById('react-root'),
);
