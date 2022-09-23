import { ActionsTypes } from '../actions/actions.constants.js';

const defaultState = {
    valueInput: ''
  };

  
export function testReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionsTypes.MIRROR_INPUT: {
      return {...state, valueInput: action.dataPassed};
    }

    default: {
      return state;
    }
  }
}