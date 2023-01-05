import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { CssBaseline, Box, Typography } from '@mui/material';

export default function ChoreList() {
    const dispatch = useDispatch();
    
    let chores = useSelector(store => store.chores)

    // we can use the params in the URL to know what child we are looking at
    const params = useParams();

    // use Effect is causing this to happen on page load
    useEffect(() => {

        dispatch({ type: 'FETCH_CHORES' });
        dispatch({type: 'FETCH_CHILDREN'});
        setCurrentChild(children.find(thisChild => thisChild.id == params.id));
        console.log('current child:', currentChild);
        console.log('Children array', children);

      }, []);



    const [children, setChildren] = useState(useSelector(store => store.children));

    const [currentChild, setCurrentChild] = useState(children.find(thisChild => thisChild.id == params.id))
    
    
    // toggles the task in and out of the 
    const handleToggle = (choreId) => {console.log(choreId, currentChild.id);}

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
            {currentChild.nickname}
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chores.map((value) => (
                <ListItem
                key={value.id}
                    secondaryAction={
                    <Switch
                        edge="end"
                        onChange={() => handleToggle(value.id)}
                        // checked={checked.indexOf(value.id) !== -1}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                }
                >
                <ListItemText primary={`${value.description}`} />
                </ListItem>
            ))}
        </List>

        </Box>
    </Container>














);
}