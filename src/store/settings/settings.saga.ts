import { IUpdateAvatarUserPayload, IUpdateUserPayload } from '@/models/models'
import UserService from '@/services/UserService'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { settingsActions } from './settings.slice'
import { loginActions } from '../login/login.slice'
import { URL_SERVER } from '@/common'

function* updateUser({ payload }: PayloadAction<IUpdateUserPayload>): any {
    const { userId, color, login, name, password } = payload
    const response = yield call(() => UserService.update(userId, { color, login, name, password }))
    yield put(settingsActions.updateUserSuccess())
    yield put(loginActions.setActiveUser(response.data))
    yield put(loginActions.getUsersFetch())
}

function* updateUserAvatar({ payload }: PayloadAction<IUpdateAvatarUserPayload>): any {
    const { picture, userId } = payload

    let formData = new FormData()
    formData.append('picture', picture)

    // const response = yield call(() => UserService.updatePicture(userId, formData))
    const response = yield call(() =>
        fetch(`${URL_SERVER}api/users/${userId}`, {
            method: 'PUT',
            body: formData
        })
    )
    const formattedResponse = yield response.json()

    yield put(loginActions.setActiveUser(formattedResponse))
    yield put(settingsActions.updateAvatarUserSuccess())
}

function* settingsSaga() {
    yield takeLeading('settings/updateUserFetch', updateUser),
        yield takeLeading('settings/updateAvatarUserFetch', updateUserAvatar)
}

export default settingsSaga
