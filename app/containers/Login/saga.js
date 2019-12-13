import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { loginSucess, LoginFailed } from './actions';

import { LOGIN_REQUEST } from './constants';

export function* login(actions) {
  const { user } = actions;

  // login api
  const loginapi = () => {
    if (user.username !== 'john@admin.com' || user.password !== 'pass123') {
      throw new Error('invalid credentials !!! ');
    }
    const userProfile = {
      id: 1,
      name: 'John Doe',
      username: user.username,
      verified: true,
    };
    return userProfile;
  };

  try {
    // login api call validating login
    yield delay(5000);
    const result = yield call(loginapi);
    yield put(push('/'));
    yield put(loginSucess(result));
  } catch (err) {
    yield put(push('/login'));
    yield put(LoginFailed(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
