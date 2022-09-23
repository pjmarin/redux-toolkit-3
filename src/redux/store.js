import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from '../../node_modules/redux-logger/src/index.js';
import rootReducer  from './reducers/index.js';
// import { combineReducers } from './reducers/index.js';


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;