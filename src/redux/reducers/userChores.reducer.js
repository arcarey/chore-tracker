const userChoreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_CHORES':
        return action.payload;
      case 'UNSET_USER_CHORES':
        return [];
      default:
        return state;
    }
  };
  

  export default userChoreReducer;