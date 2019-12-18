/*
 *
 * Login actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
} from './constants';

export function loginRequeust(user) {
  return {
    type: LOGIN_REQUEST,
    user,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
export function logout() {
  return {
    type: LOGOUT_USER,
  };
}
