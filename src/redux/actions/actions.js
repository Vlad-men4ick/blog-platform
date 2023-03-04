export const userRegistered = { type: 'TRUE' };
export const userNoregistered = { type: 'FALSE' };

export const userName = (payload) => ({
  type: 'USERNAME',
  payload,
});

export const userPassword = (payload) => ({
  type: 'USERPASS',
  payload,
});

export const userEmail = (payload) => ({
  type: 'USEREMAIL',
  payload,
});

export const userAvatar = (payload) => ({
  type: 'USERAVATAR',
  payload,
});
