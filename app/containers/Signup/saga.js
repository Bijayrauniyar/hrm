import { takeLatest, delay, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { signupFailed, signupSuccess } from './actions';
import { SIGNUP_REQUEST } from './constants';
export function* signup(actions) {
  const { user } = actions;

  // mock singup api
  const signupApi = () => {
    if (user.username === 'john@admin.com') {
      throw new Error(
        'The email address you have entered is already registered',
      );
    }
    const userProfile = {
      username: user.username,
      password: user.password,
    };
    return userProfile;
  };

  try {
    // signup api call
    yield delay(5000);
    const result = yield call(signupApi);
    yield put(push('/login'));
    yield put(signupSuccess(result));
  } catch (err) {
    yield put(signupFailed(err.message));
  }
}

export default function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}
