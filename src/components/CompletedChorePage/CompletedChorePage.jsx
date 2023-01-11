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
import FamilyCompletedChoreList from '../FamilyCompletedChoreList/FamilyCompletedChoreList';
import UserCompletedChoreList from '../UserCompletedChoreList/UserCompletedChoreList';








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
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{mt: 5, mb: 5}}>
            {user?.is_parent && family?.name} Completed Chores
          </Typography>

          {user?.is_parent && <FamilyCompletedChoreList/>}
          {!user?.is_parent && <UserCompletedChoreList/>}



        </Box>
      </Container>
  );
}