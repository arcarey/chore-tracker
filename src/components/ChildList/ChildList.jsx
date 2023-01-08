import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
    console.log(children);

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_CHILDREN' };
        dispatch(action);
      }, []);

    const deleteItem = (id) => dispatch({ type: 'DELETE_CHILD', payload: {id: id}})

    const history = useHistory()

    if (props.showDelete){
      return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <Divider></Divider>
          {children.map((value) => (
            <ListItem
              button
              divider
              onClick={() => history.push(`/child/assign/${value.id}`)}  
              key={value.id}
                secondaryAction={
                <IconButton 
                    onClick={() => deleteItem(value.id)}
                    aria-label="delete">
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
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Divider></Divider>
        {children.map((value) => (
          <ListItem
            button
            divider
            onClick={() => history.push(`/child/assign/${value.id}`)}  
            key={value.id}
          >
            <ListItemText primary={`${value.nickname}`} />
          </ListItem>
        ))}
      </List>
    );
  
}