import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
import { CssBaseline, Box, Typography } from '@mui/material';
import ChildList from '../ChildList/ChildList';

export default function ChoreList() {
    const dispatch = useDispatch();
    
    let currentChild = useSelector(store => store.currentChild)[0]
    let chores = useSelector(store => store.chores)
    let userChores = useSelector(store => store.userChores)

    let currentChildId = useParams().id
    console.log('current child id', currentChildId);

    // we can use the params in the URL to know what child we are looking at

    // use Effect is causing this to happen on page load
    useEffect(() => {
        dispatch({type: 'FETCH_CHORES'});
        dispatch({type: 'GET_CURRENT_CHILD', payload: currentChildId})
        dispatch({type: 'FETCH_USER_CHORES', payload: currentChildId});
      }, []);
    
    // toggles the task as assigned or unassigned to a person
    const handleToggle = (choreId) => {
        if (userChores.map(userChore => userChore.chore_id).indexOf(choreId) !== -1){
            dispatch({type: 'DELETE_USER_CHORE', payload: {choreId: choreId, userId: currentChild.id}})
        } else{
            dispatch({type: 'ADD_USER_CHORE', payload: {choreId: choreId, userId: currentChild.id}})
        }
    }

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
            {currentChild?.nickname}
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chores.map((chore) => (
                <ListItem
                key={chore.id}
                    secondaryAction={
                    <Switch
                        edge="end"
                        onChange={() => handleToggle(chore.id)}
                        checked={userChores.map(userChore => userChore.chore_id).indexOf(chore.id) !== -1}
                    />
                }
                >
                <ListItemText primary={`${chore.description}`} />
                </ListItem>
            ))}
        </List>
        <Divider/>
        <ChildList/>
        </Box>
    </Container>


);
}