import { combineReducers } from "redux";
import { amount } from './amount.js';
import { testReducer } from './testReducer.js';

export default combineReducers({
  amount,
  testReducer
});