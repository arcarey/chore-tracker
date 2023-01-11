const completedChoreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPLETED_CHORES':
        return action.payload;
      case 'UNSET_COMPLETED_CHORES':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default completedChoreReducer;