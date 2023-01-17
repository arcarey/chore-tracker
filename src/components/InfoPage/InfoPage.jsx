import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import ChildList from '../ChildList/ChildList';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';




export default function addChild() {
    const dispatch = useDispatch();
    const family = useSelector(store => store.family)[0];
    const user = useSelector(store=> store.user);
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_FAMILY'})
    }, [])


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
          <Typography component="h1" variant="h5" sx={{mt: 5}}>
            Tech Used:
          </Typography>
          <List  sx={{mt: 5}} >
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                Node.js
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                React.js
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                Redux/Redux-Sagas
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                Cron
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                Material UI
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                Node.js
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{textAlign: 'center'}}>
                Express.js
              </ListItemText>
            </ListItem>
          </List>
          <Typography sx={ {mt: 12 , p:2}} >Thanks to my wonderful, supportive family, the Shawl cohort and my instructors at Prime!</Typography>

        </Box>
      </Container>
  );
}