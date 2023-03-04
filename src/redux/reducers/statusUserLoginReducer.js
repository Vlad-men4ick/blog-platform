const defaultState = false;
const statusUserLoginReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'TRUE':
      return true;
    case 'FALSE':
      return false;
    default:
      return state;
  }
};

export default statusUserLoginReducer;
