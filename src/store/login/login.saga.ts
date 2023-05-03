import { URL_SERVER } from '@/common'
import { call, put, takeEvery } from 'redux-saga/effects'
import { loginActions } from './login.slice'

function* workGetAuthFetch(): any {
  const authData = yield call(() => fetch(`${URL_SERVER}api/users`))
  const formattedAuthData = yield authData.json()
  yield put(loginActions.getUsersSuccess(formattedAuthData))
}

function* loginSaga() {
  yield takeEvery('login/getUsersFetch', workGetAuthFetch) //имя слайса слэш название редьюсера
}

export default loginSaga
