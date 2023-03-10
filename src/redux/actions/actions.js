export const userRegistered = { type: 'TRUE' };
export const userNoregistered = { type: 'FALSE' };

export const userData = (payload) => ({
  type: 'USERDATA',
  payload,
});
