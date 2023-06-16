import { spawn } from 'redux-saga/effects'
import loginSaga from './login/login.saga'
import registrationSaga from './registration/registration.saga'
import entriesSaga from './entries/entries.saga'
import settingsSaga from './settings/settings.saga'

export default function* rootSaga() {
    yield spawn(loginSaga)
    yield spawn(registrationSaga)
    yield spawn(entriesSaga)
    yield spawn(settingsSaga)
}
