import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ChoreList() {
    const dispatch = useDispatch();
    
    let chores = useSelector(store => store.chores)
    console.log(chores);

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_CHORES' };
        dispatch(action);
      }, []);

    const deleteItem = (id) => dispatch({ type: 'DELETE_CHORE', payload: {id: id}})

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chores.map((value) => (
        <ListItem
          key={value.id}
            secondaryAction={
            <IconButton 
                onClick={() => deleteItem(value.id)}
                aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`${value.description}`} />
        </ListItem>
      ))}
    </List>
  );
}