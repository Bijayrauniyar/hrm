import { delay, put, takeLatest } from 'redux-saga/effects';

import { loginSucess, LoginFailed } from './actions';

import { LOGIN_REQUEST } from './constants';

export function* login(actions) {
  const { user } = actions;

  try {
    // login api call
    yield delay(500);
    yield put(
      loginSucess({
        id: 1,
        name: 'John Doe',
        username: user.username,
        verified: true,
      }),
    );
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
