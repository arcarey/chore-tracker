import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    { field: 'description', headerName: 'Chore', width: 170 },
    { field: 'time_completed', headerName: 'Date', width: 170 }
];


export default function DataTable() {
    const dispatch = useDispatch();
    const rows = useSelector(store => store.completedChores)
    const user = useSelector(store => store.user)

    
    React.useEffect(()=> {
        dispatch({type: 'FETCH_COMPLETED_CHORES', payload: user.id})
    }, [user])
    
    console.log(rows);


      






  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
}