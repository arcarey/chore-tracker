import { Box, Divider, Typography, TextField, Button, Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box component="form" onSubmit={login}>
        <Typography variant="h5">Login</Typography>
        <Divider sx={{mt: 1, mb:2}}/>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
            <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Username"
                name="username"
                type="username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
          <Button
            type="login"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
    </Box>
    </Container>
  );
}

export default LoginForm;
