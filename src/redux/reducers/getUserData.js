const defaultState = {};

const getUserData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'USERDATA':
      return { ...action.payload };

    default:
      return state;
  }
};

export default getUserData;
