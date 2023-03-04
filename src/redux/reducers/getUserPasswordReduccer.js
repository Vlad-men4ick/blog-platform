const defaultState = {};

const getUserPasswordReduccer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'USERPASS':
      return { ...action.payload };

    default:
      return state;
  }
};

export default getUserPasswordReduccer;
