const childrenReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHILDREN':
        return action.payload;
      case 'UNSET_CHILDREN':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default childrenReducer;