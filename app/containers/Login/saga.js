import { delay, select, put, takeLatest, call } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { setUser, removeUser } from 'containers/App/actions';
import { makeSelectUser } from '../App/selectors';
import { loginSuccess, loginFailed } from './actions';
import { LOGIN_REQUEST, LOGOUT_USER } from './constants';

export function* checkLoggedIn(actions) {
  const { location } = actions.payload;
  const user = yield select(makeSelectUser());
  if (
    (location.pathname === '/login' || location.pathname === '/signup') &&
    user
  ) {
    yield delay(1);
    yield put(push('/'));
  }
}
export function* logout() {
  yield delay(1000);
  yield put(removeUser());
}

export function* login(actions) {
  const { user } = actions;

  // mock login api
  const loginApi = () => {
    if (user.username !== 'john@example.com' || user.password !== 'pass123') {
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
    const result = yield call(loginApi);
    yield put(setUser(result));
    yield put(push('/'));
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFailed(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT_USER, logout);
  yield takeLatest(LOCATION_CHANGE, checkLoggedIn);
}
