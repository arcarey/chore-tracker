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
import { Divider } from '@mui/material';



export default function BottomNav(props) {

    const history = useHistory();

  return (
 
    <Paper sx={{ position: 'fixed', bottom: -10, left: 0, right: 0, }} elevation={3}>
        <Box sx={{ pb: 1 }}>
            <BottomNavigation
              sx={{ backgroundColor: 'primary.transparent', height: 70 }}
            showLabels
            >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={ () => history.push('/home')} />
            <Divider orientation='vertical' variant='fullWidth'></Divider>
            <BottomNavigationAction label="Info" icon={<InfoIcon />} onClick={() => history.push('/home')}/>
            <Divider orientation='vertical' variant='fullWidth'></Divider>
            <BottomNavigationAction label="Complete" icon={<GradingIcon />} onClick={() => history.push('/complete')}/>
            <Divider orientation='vertical' variant='fullWidth'></Divider>
            <BottomNavigationAction label="Back" icon={<UndoIcon />} onClick={() => history.goBack()}/>
            </BottomNavigation>
        </Box>
    </Paper>
  );
}




