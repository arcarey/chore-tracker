import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import ChildList from '../ChildList/ChildList';




export default function addChild() {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        username: data.get('username'),
        password: data.get('password'),
        nickname: data.get('nickName'),
    });
        dispatch({type: 'REGISTER_CHILD', payload:{
            username: data.get('username'),
            password: data.get('password'),
            nickname: data.get('nickName'),
        }})
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Child
          </Typography>
          <Box component="form" onSubmit={handleSubmit} >
          <TextField
              margin="normal"
              required
              fullWidth
              id="nickName"
              label="Nick Name"
              name="nickName"
              autoComplete="nickName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Child
            </Button>
            <Grid container></Grid>
          </Box>
          <ChildList showDelete/>
        </Box>
      </Container>
  );
}