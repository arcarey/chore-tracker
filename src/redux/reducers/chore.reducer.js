const choreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHORES':
        return action.payload;
      case 'UNSET_CHORES':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default choreReducer;