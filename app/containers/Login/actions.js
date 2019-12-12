/*
 *
 * Login actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export function loginRequeust() {
  console.log('loginRequest');
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSucess(username, password) {
  console.log('login success and ', username, password);
  return {
    type: LOGIN_SUCCESS,
    username,
    password,
  };
}

export function LoginFailed(error) {
  console.log('login failed', error);
  return {
    type: LOGIN_FAILED,
    error,
    message: 'Login Failed',
  };
}
