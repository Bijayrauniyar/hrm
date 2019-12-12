/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export const initialState = {
  loading: false,
  error: null,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.user = null;
        break;

      case LOGIN_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;

      case LOGIN_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default loginReducer;
