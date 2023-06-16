import { URL_SERVER } from '@/common'
import { call, put, takeEvery } from 'redux-saga/effects'
import { loginActions } from './login.slice'
import UserService from '@/services/UserService'

function* workGetAuthFetch(): any {
    try {
        const authData = yield call(() => UserService.getAll())
        yield put(loginActions.getUsersSuccess(authData.data))
    } catch (error) {
        throw error
    }
}

function* loginSaga() {
    yield takeEvery('login/getUsersFetch', workGetAuthFetch) //имя слайса слэш название редьюсера
}

export default loginSaga
