/* eslint-disable import/prefer-default-export */
import statusUserReducer from '../reducers/statusUserLoginReducer';
import getUserDataReducer from '../reducers/getUserDataReducer';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  isLogin: statusUserReducer,
  userData: getUserDataReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

export default store;
