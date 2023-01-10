import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];


export default function MultipleSelectCheckmarks(props) {

  const [dayName, setDayName] = useState([]);

  const dispatch = useDispatch();

  
  
  // let currentChild = useSelector(store => store.currentChild)[0]
  let userChores = useSelector(store => store.userChores)
  
 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDayName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    
    let recurring = typeof value === 'string' ? value.split(',') : value
    console.log(typeof value === 'string' ? value.split(',') : value);
    dispatch({type: 'PUT_RECURRENCE', payload: {userId: props.currentChildId, choreId: props.choreId, recurring: JSON.stringify(recurring)}})


  };

  // this is used to control the checkboxes on the dropdown menu
useEffect(()=>{
  userChores.find(e => e.chore_id === props.choreId)?.recurrence && setDayName(JSON.parse(userChores.find(e => e.chore_id === props.choreId)?.recurrence))
}, [userChores])





  return (
    <div>
      <FormControl sx={{ mr: 2, width: 120 }} size='small'>
        <InputLabel id="recur">Repeat</InputLabel>
        <Select
          labelId="recur"
          id="recur"
          disabled={props.disabled}
          multiple
          value={dayName}
          onChange={handleChange}
          input={<OutlinedInput label="Repeat" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={dayName.indexOf(day) > -1} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}