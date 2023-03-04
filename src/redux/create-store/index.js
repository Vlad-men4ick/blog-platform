/* eslint-disable import/prefer-default-export */
import statusUserReducer from '../reducers/statusUserLoginReducer';
import getUserNameReduccer from '../reducers/getUserNameReduccer';
import getUserEmailReduccer from '../reducers/getUserEmailReduccer';
import getUserAvatarReduccer from '../reducers/getUserAvatarReduccer';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  isLogin: statusUserReducer,
  userName: getUserNameReduccer,
  userEmail: getUserEmailReduccer,
  userAvatar: getUserAvatarReduccer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

export default store;
