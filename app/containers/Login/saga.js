import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setUser } from 'containers/App/actions';
import { loginSuccess, loginFailed } from './actions';
import { LOGIN_REQUEST } from './constants';

export function* login(actions) {
  const { user } = actions;

  // mock login api
  const loginApi = () => {
    const users = [
      {
        id: 1,
        name: 'John',
        username: 'john@example.com',
        password: 'pass123',
        firstName: 'Admin',
        lastName: 'lastname',
        role: 'ADMIN',
      },
      {
        id: 2,
        name: 'User',
        username: 'user@example.com',
        password: 'pass123',
        firstName: 'lastname',
        lastName: 'User',
        role: 'USER',
      },
    ];

    const checkUser = users.find(
      x => x.username === user.username && x.password === user.password,
    );

    if (!checkUser) {
      throw new Error('invalid credentials !!! ');
    }

    return checkUser;
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
}
