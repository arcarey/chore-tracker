import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2'



export default function ChoreList() {
    const dispatch = useDispatch();
    
    let chores = useSelector(store => store.chores)
    console.log(chores);

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_CHORES' };
        dispatch(action);
      }, []);

    const deleteItem = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          dispatch({ type: 'DELETE_CHORE', payload: {id: id}})
        }
      })
    } 
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chores.map((value) => (
        <ListItem
          key={value.id}
            secondaryAction={
            <IconButton 
                onClick={() => deleteItem(value.id)}
                aria-label="delete">
              <DeleteIcon sx={{color: '#A66862'}} />
            </IconButton>
          }
        >
          <ListItemText primary={`${value.description}`} />
        </ListItem>
      ))}
    </List>
  );
}