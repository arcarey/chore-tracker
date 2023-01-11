import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';


export default function ButtonAppBar() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  function logout() {
    dispatch({type: 'LOGOUT'})
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, padding: '12px' }}>
            Chore Tracker
          </Typography>
          {user.id&&<Button onClick={logout} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


