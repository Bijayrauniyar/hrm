/*
 * App Actions
 */

import { SET_USER, REMOVE_USER } from './constants';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER,
    user: null,
  };
}
