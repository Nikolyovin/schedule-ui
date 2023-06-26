import { IUpdateAvatarUserPayload, IUpdateUserPayload, IUser } from '@/models/models'
import UserService from '@/services/UserService'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { settingsActions } from './settings.slice'
import { loginActions } from '../login/login.slice'
import { NotificDescrip, NotificMes, NotificType, URL_SERVER, notificationError } from '@/common'
import { commonActions } from '../common/common.slice'

function* updateUserFetch({ payload }: PayloadAction<IUpdateUserPayload>): any {
    try {
        const { userId, color, login, name, password } = payload
        const response = yield call(() => UserService.update(userId, { color, login, name, password }))
        yield put(settingsActions.updateUserSuccess(response.data))
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
        console.log(e)
    }
}

function* updateUserSuccess({ payload }: PayloadAction<IUser>): any {
    yield put(loginActions.setActiveUser(payload))
    yield put(loginActions.getUsersFetch())
    const notificationData = {
        type: NotificType.SUCCESS,
        message: NotificMes.SUCCESS,
        description: NotificDescrip.UPDATE_USER
    }
    yield put(commonActions.setNotificationData(notificationData))
    yield put(commonActions.setIsShowNotification(true))
}

function* updateAvatarUserFetch({ payload }: PayloadAction<IUpdateAvatarUserPayload>): any {
    try {
        const { picture, userId } = payload
        let formData = new FormData()
        formData.append('picture', picture)

        const response = yield call(() => UserService.updatePicture(userId, formData))
        const formattedResponse = yield response.json()
        yield put(settingsActions.updateAvatarUserSuccess(formattedResponse))
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
        console.log(e)
    }
}

function* updateAvatarUserSuccess({ payload }: PayloadAction<IUser>): any {
    yield put(loginActions.setActiveUser(payload))

    const notificationData = {
        type: NotificType.SUCCESS,
        message: NotificMes.SUCCESS,
        description: NotificDescrip.UPDATE_USER_PHOTO
    }
    yield put(commonActions.setNotificationData(notificationData))
    yield put(commonActions.setIsShowNotification(true))
}

function* settingsSaga() {
    yield takeLeading('settings/updateUserFetch', updateUserFetch),
        yield takeLeading('settings/updateUserSuccess', updateUserSuccess),
        yield takeLeading('settings/updateAvatarUserFetch', updateAvatarUserFetch)
    yield takeLeading('settings/updateAvatarUserSuccess', updateAvatarUserSuccess)
}

export default settingsSaga
