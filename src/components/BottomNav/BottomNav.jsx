import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GradingIcon from '@mui/icons-material/Grading';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import UndoIcon from '@mui/icons-material/Undo';
import { useHistory } from 'react-router-dom';



export default function BottomNav() {

    const history = useHistory();

  return (
 
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Box sx={{ pb: 1 }}>
            <BottomNavigation
            showLabels
            >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={ () => history.push('/home')}/>
            <BottomNavigationAction label="Info" icon={<InfoIcon />} onClick={() => history.push('/home')}/>
            <BottomNavigationAction label="Complete" icon={<GradingIcon />} onClick={() => history.push('/home')}/>
            <BottomNavigationAction label="Back" icon={<UndoIcon />} onClick={() => history.goBack()}/>
            </BottomNavigation>
        </Box>
    </Paper>
  );
}




