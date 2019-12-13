/* eslint-disable prettier/prettier */
/*
 * AppReducer
 *
 */

import produce from 'immer';

import { SET_USER } from './constants';

// The initial state of the App
export const initialState = {
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case SET_USER:
        draft.user = action.user;
        break;
      default:
        return draft;
    }
  });

export default appReducer;
