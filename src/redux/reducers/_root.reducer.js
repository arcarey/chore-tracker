import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import chores from './chore.reducer';
import children from './children.reducer';
import currentChild from './currentChild.reducer';
import userChores from './userChores.reducer';
import family from './family.reducer';
import completedChores from './completedChore.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  chores, // contains a list of all chores for user in database
  children, // contains a list of all children users in database
  currentChild, // contains the current child the parent user is assigning
  userChores, // contains all the chores assigned to a specific user
  family, // contains the familyName for the logged in user
  completedChores, // contains all the completed chores for a user or family
});

export default rootReducer;
