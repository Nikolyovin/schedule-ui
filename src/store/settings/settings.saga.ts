import { IUpdateUserPayload } from '@/models/models'
import UserService from '@/services/UserService'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { settingsActions } from './settings.slice'
import { loginActions } from '../login/login.slice'

function* updateUser({ payload }: PayloadAction<IUpdateUserPayload>): any {
    console.log('payload', payload)

    const { userId, color, login, name, password } = payload
    const response = yield call(() => UserService.update(userId, { color, login, name, password }))
    yield put(settingsActions.updateUserSuccess())
    yield put(loginActions.setActiveUser(response.data))
    yield put(loginActions.getUsersFetch())
}

function* settingsSaga() {
    yield takeLeading('settings/updateUserFetch', updateUser)
}

export default settingsSaga
