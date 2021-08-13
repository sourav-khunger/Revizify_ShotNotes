import {takeLatest} from 'redux-saga/effects';

import {loginUser} from '../ReduxAPIHandler/LoginApi';

function* login(params) {
  console.log('saga12345', params);
  yield loginUser(params.payload);
}
export default function* rootSaga() {
  yield takeLatest('LOGIN', login);
}
