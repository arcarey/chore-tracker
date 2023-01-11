const currentChildReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CURRENT_CHILD':
        return action.payload;
      case 'UNSET_CURRENT_CHILD':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default currentChildReducer;