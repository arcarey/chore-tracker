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
            Welcome  {family.name} Family
          </Typography>
          <Box sx={{mt: 10}}>
            <Button
                variant="contained"
                sx={{padding: 2, margin: 2}}
                onClick={() => history.push('/addchore')}
            >
                Add Chores
            </Button>
            <Button
                variant="contained"
                sx={{padding: 2, margin: 2}}
                onClick={() => history.push('/addchild')}
            >
                Add Children
            </Button>

          </Box>

          <ChildList />
        </Box>
      </Container>
  );
}