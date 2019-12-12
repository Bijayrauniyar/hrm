/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export const initialState = {
  loading: false,
  error: {
    error: null,
    message: null,
  },
  UserData: {
    username: null,
    password: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case LOGIN_SUCCESS:
        draft.userData.username = action.username;
        draft.UserData.password = action.password;
        draft.loading = false;
        break;

      case LOGIN_FAILED:
        draft.error.error = action.error;
        draft.error.message = action.message;
        draft.loading = false;
        break;
    }
  });

export default loginReducer;
