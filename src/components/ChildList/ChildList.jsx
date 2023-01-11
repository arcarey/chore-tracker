import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Divider from '@mui/material/Divider'

export default function ChildList(props) {
    const dispatch = useDispatch();
    
    let children = useSelector(store => store.children)

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_CHILDREN' };
        dispatch(action);
      }, []);

    const deleteItem = (id) => {
      dispatch({ type: 'DELETE_CHILD', payload: {id: id}})
    }

    const history = useHistory()

    if (props.showDelete){
      return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: '40px' }}>
          <Divider></Divider>
          {children.map((value) => (
            <ListItem
              divider
              onClick={() => history.push(`/child/assign/${value.id}`)}  
              key={value.id}
                secondaryAction={
                <IconButton 
                    onClick={(event) => {
                      deleteItem(value.id)
                      event.stopPropagation();
                    }}
                    aria-label="delete" >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${value.nickname}`} />
            </ListItem>
          ))}
        </List>
      );    
    }
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: 'fixed', bottom: 90}}>
        <Divider></Divider>
        {children.map((value) => (
          <ListItem disablePadding >
            <ListItemButton
              divider
              onClick={() => history.push(`/child/assign/${value.id}`)}  
              key={value.id}
            >
              <ListItemText primary={`${value.nickname}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  
}