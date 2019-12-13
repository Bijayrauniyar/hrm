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

export function loginSucess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function LoginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
