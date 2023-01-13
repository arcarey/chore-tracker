import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ChoreList() {
    const dispatch = useDispatch();
    
    let chores = useSelector(store => store.userChores)
    console.log(chores);

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_LOGGED_IN_USER_CHORES' };
        dispatch(action);
      }, []);
    
    const handleChange = (choreId, chore) => {
        if(chore.is_active){
            // add to completed chore
            dispatch({type: 'ADD_TO_COMPLETED', payload: {userChoreId: choreId}})
        } else {
            // remove from completed chore
            dispatch({type: 'UNDO_ADD_TO_COMPLETED', payload: {userChoreId: choreId}})
        }
        dispatch({type: 'TOGGLE_IS_ACTIVE', payload: {userChoreId: choreId}})
    }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 5}}>
      {chores.map((value) => (
        <ListItem
          key={value.id}
            secondaryAction={
            <Checkbox
                size='large'
                checked={!value.is_active}
                onChange={() => handleChange(value.id, value)}/>
          }
        >
          <ListItemText primary={`${value.description}`} />
        </ListItem>
      ))}
    </List>
  );
}