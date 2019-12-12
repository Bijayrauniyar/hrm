import { delay, put, takeLatest } from 'redux-saga/effects';

import { loginSucess, LoginFailed } from './actions';

import { LOGIN_REQUEST } from './constants';

export function* login() {
  const username = 'user@gmail.com';
  const password = 'pass123';

  try {
    // login api call
    yield delay(500);
    yield put(loginSucess(username, password));
  } catch (err) {
    yield put(LoginFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
