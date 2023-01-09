import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';


export default function ButtonAppBar() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  function logout() {
    dispatch({type: 'LOGOUT'})
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, padding: '12px' }}>
            Chore Tracker
          </Typography>
          {user.id&&<Button onClick={logout} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}





// import React from 'react';
// import { Link } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
// import { useSelector } from 'react-redux';

// function Nav() {
//   const user = useSelector((store) => store.user);

//   return (
//     <div className="nav">
//       <Link to="/home">
//         <h2 className="nav-title">Chore-Tracker</h2>
//       </Link>
//       <div>
//         {/* If no user is logged in, show these links */}
//         {!user.id && (
//           // If there's no user, show login/registration links
//           <Link className="navLink" to="/login">
//             Login / Register
//           </Link>
//         )}

//         {/* If a user is logged in, show these links */}
//         {user.id && (
//           <>
//             <Link className="navLink" to="/home">
//               Home
//             </Link>

//             <Link className="navLink" to="/info">
//               Info Page
//             </Link>

//             <LogOutButton className="navLink" />
//           </>
//         )}

//         <Link className="navLink" to="/about">
//           About
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Nav;
