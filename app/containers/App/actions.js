/*
 * App Actions
 */
import { LOGOUT_USER } from '../Login/constants';
import { SET_USER } from './constants';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function removeUser() {
  return {
    type: LOGOUT_USER,
    user: null,
  };
}
