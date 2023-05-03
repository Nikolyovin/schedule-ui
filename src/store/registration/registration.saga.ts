import { URL_SERVER } from '@/common'
import { call, put, takeEvery } from 'redux-saga/effects'
import { registrationActions } from './registration.slice'

function* workGetAuthFetch(): any {
  const authData = yield call(() => fetch(`${URL_SERVER}api/users`))
  const formattedAuthData = yield authData.json()
  yield put(registrationActions.getUsersSuccess(formattedAuthData))
}

function* loginSaga() {
  yield takeEvery('login/getUsersFetch', workGetAuthFetch) //имя слайса слэш название редьюсера
}

export default loginSaga
