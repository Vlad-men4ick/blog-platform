const defaultState = {};

const getUserEmailReduccer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'USEREMAIL':
      return { ...action.payload };

    default:
      return state;
  }
};

export default getUserEmailReduccer;
