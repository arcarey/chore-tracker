import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    { field: 'nickname', headerName: 'Name', width: 80 },
    { field: 'description', headerName: 'Chore', width: 150 },
    { field: 'time_completed', headerName: 'date', width: 123 }
];


export default function DataTable() {
    const dispatch = useDispatch();
    const rows = useSelector(store => store.completedChores)
    const user = useSelector(store => store.user)

    
    React.useEffect(()=> {
        dispatch({type: 'FETCH_COMPLETED_CHORES', payload: user.family_id})
    }, [user])
    
    console.log(rows);


      






  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
}