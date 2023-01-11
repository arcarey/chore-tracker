import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    { field: 'nickname', headerName: 'Name', width: 90 },
    { field: 'description', headerName: 'Chore', width: 150 },
    { field: 'date', headerName: 'Date', width: 95 }
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
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}