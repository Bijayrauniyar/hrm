/*
 *
 * Signup reducer
 *
 */
import produce from 'immer';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILED } from './constants';

export const initialState = {
  loading: false,
  error: null,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const signupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.user = null;
        break;

      case SIGNUP_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;

      case SIGNUP_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default signupReducer;
