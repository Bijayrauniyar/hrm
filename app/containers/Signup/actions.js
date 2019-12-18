/*
 *
 * Signup actions
 *
 */
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILED } from './constants';

export function signupRequeust(user) {
  return {
    type: SIGNUP_REQUEST,
    user,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}
