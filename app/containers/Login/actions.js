/*
 *
 * Login actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

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
