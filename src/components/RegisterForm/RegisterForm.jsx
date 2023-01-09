import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Typography, TextField, Button, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [familyName, setFamilyName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        familyName: familyName,
        isParent: 'true'
      },
    });
  }; // end registerUser

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box component="form" onSubmit={registerUser}>
      <center>
        <Typography variant="h5">Register Family</Typography>
      </center>
      <Divider sx={{mt: 1, mb:2}}/>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
          <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="username"
              autoComplete="username"
              type="username"
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
              autoComplete="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="familyName"
              label="Family Name"
              name="familyName"
              autoComplete="familyName"
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
            />

        <Button
          type="register"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
  </Box>
  </Container>

  );
}

export default RegisterForm;
