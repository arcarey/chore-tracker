import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from "react-redux";



export default function addChild() {
    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        description: data.get('chore'),
        });
        dispatch({type: 'ADD_CHORE', payload: {
            description: data.get('chore'),
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
            Add Chore
          </Typography>
          <Box component="form" onSubmit={handleSubmit} >
          <TextField
              margin="normal"
              required
              fullWidth
              id="chore"
              label="New Chore"
              name="chore"
              autoComplete="chore"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Chore
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
  );
}