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
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        break;

      case LOGIN_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default loginReducer;
