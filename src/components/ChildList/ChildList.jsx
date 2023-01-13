import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Divider from '@mui/material/Divider'
import { Typography } from '@mui/material';

import Swal from 'sweetalert2'


import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';


export default function ChildList(props) {
    const dispatch = useDispatch();
    const theme = useTheme()
    console.log(theme.palette);

    let children = useSelector(store => store.children)
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    }
    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_CHILDREN' };
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
            dispatch({ type: 'DELETE_CHILD', payload: {id: id}})
          }
        })
    }

    const history = useHistory()

    if (props.showDelete){
      return (
        <List sx={{ width: '100%', maxWidth: 360,  backgroundColor: 'paper', marginTop: '40px' }}>
          {children.map((value) => (
            <ListItem
              onClick={() => history.push(`/child/assign/${value.id}`)}  
              key={value.id}
                secondaryAction={
                <IconButton 
                    onClick={(event) => {
                      deleteItem(value.id)
                      event.stopPropagation();
                    }}
                    aria-label="delete" >
                  <DeleteIcon sx={{color: '#A66862'}}/>
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
    <List
      sx={{ width: '80%', maxWidth: 360, mt: 7, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1.5 }}
      component="nav"
      aria-labelledby="nested-list-subheader"

    >
      <ListItemButton onClick={handleClick} >

        <ListItemText primary="Select a Child to assign chores"  />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {children.map((value) => (
          <ListItem disablePadding key={value.id}
              >
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
      </Collapse>
    </List>
  );
};
