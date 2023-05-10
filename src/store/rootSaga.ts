import { spawn } from 'redux-saga/effects'
import loginSaga from './login/login.saga'
import registrationSaga from './registration/registration.saga'

export default function* rootSaga() {
  yield spawn(loginSaga)
  yield spawn(registrationSaga)
}
