const defaultState = {};

const getUserAvatarReduccer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'USERAVATAR':
      return { ...action.payload };

    default:
      return state;
  }
};

export default getUserAvatarReduccer;
