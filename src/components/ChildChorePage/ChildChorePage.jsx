import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from "react-redux";
import AssignedChoreList from '../AssignedChoreList/AssignedChoreList';



export default function ChildChorePage() {
    const dispatch = useDispatch();



  return (
      <Container component="main" maxWidth="xs">
        <Box>
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
            Chore List for {useSelector(store => store.user.nickname)}
          </Typography>

            <Grid container></Grid>
          </Box>
          <AssignedChoreList/>
        </Box>
      </Container>
  );
}