import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import TopNav from '../TopNav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddChildPage from '../AddChildPage/AddChildPage';
import AddChorePage from '../AddChorePage/AddChorePage';
import AssignChorePage from '../AssignChorePage/AssignChorePage';
import FamilyPage from '../FamilyPage/FamilyPage';
import BottomNav from '../BottomNav/BottomNav';

import './App.css';
import ChildChorePage from '../ChildChorePage/ChildChorePage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <TopNav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}


          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id && user.is_parent ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              : user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id && user.is_parent ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              : user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
              {user.id && user.is_parent ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/family" />
              : user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows AddChildPage else shows LoginPage
            exact
            path="/addchild"
          >
            {user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the login page
              
            <AddChildPage />}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddChildPage else shows LoginPage
            exact
            path="/addchore"
          >
            {user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the login page
              
            <AddChorePage />}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddChildPage else shows LoginPage
            exact
            path="/child/assign/:id"
          >
            {user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the login page
              
            <AssignChorePage />}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddChildPage else shows LoginPage
            exact
            path="/chores"
          >
            {user.id && user.is_parent ?
            <Redirect to ="/home" /> :
            <ChildChorePage />}
          </ProtectedRoute>

          <ProtectedRoute
            // landing family page for the parent
            exact
            path="/family"
          >
            {user.id && !user.is_parent ?
                <Redirect to="/chores" /> :
              // Otherwise, show the login page
              
            <FamilyPage />}
          </ProtectedRoute>


          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>

        {/* Should only show bottom nav if logged in */}
        {user.id && <BottomNav/>}
        
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
