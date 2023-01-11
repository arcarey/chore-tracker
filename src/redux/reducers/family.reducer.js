const familyReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_FAMILY_NAME':
        return action.payload;
      case 'UNSET_FAMILY_NAME':
        return {};
      default:
        return state;
    }
  };
  

  export default familyReducer;