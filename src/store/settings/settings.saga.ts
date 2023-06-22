import { IUpdateAvatarUserPayload, IUpdateUserPayload } from '@/models/models'
import UserService from '@/services/UserService'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { settingsActions } from './settings.slice'
import { loginActions } from '../login/login.slice'
import { NotificDescrip, NotificMes, NotificType, URL_SERVER } from '@/common'
import { commonActions } from '../common/common.slice'

function* updateUser({ payload }: PayloadAction<IUpdateUserPayload>): any {
    try {
        const { userId, color, login, name, password } = payload
        const response = yield call(() => UserService.update(userId, { color, login, name, password }))
        yield put(settingsActions.updateUserSuccess())
        yield put(loginActions.setActiveUser(response.data))
        yield put(loginActions.getUsersFetch())
        const notificationData = {
            type: NotificType.SUCCESS,
            message: NotificMes.SUCCESS,
            description: NotificDescrip.UPDATE_USER
        }
        yield put(commonActions.setNotificationData(notificationData))
        yield put(commonActions.setIsShowNotification(true))
    } catch (e: any) {
        const notificationError = {
            type: NotificType.ERROR,
            message: NotificMes.ERROR,
            description: `${e.name}: ${e.message}`
        }
        yield put(commonActions.setNotificationData(notificationError))
        yield put(commonActions.setIsShowNotification(true))
        console.log(e)
    }
}

function* updateUserAvatar({ payload }: PayloadAction<IUpdateAvatarUserPayload>): any {
    try {
        const { picture, userId } = payload
        let formData = new FormData()
        formData.append('picture', picture)

        const response = yield call(() => UserService.updatePicture(userId, formData))
        const formattedResponse = yield response.json()

        yield put(loginActions.setActiveUser(formattedResponse))
        yield put(settingsActions.updateAvatarUserSuccess())

        const notificationData = {
            type: NotificType.SUCCESS,
            message: NotificMes.SUCCESS,
            description: NotificDescrip.UPDATE_USER_PHOTO
        }
        yield put(commonActions.setNotificationData(notificationData))
        yield put(commonActions.setIsShowNotification(true))
    } catch (e: any) {
        const notificationError = {
            type: NotificType.ERROR,
            message: NotificMes.ERROR,
            description: `${e.name}: ${e.message}`
        }
        yield put(commonActions.setNotificationData(notificationError))
        yield put(commonActions.setIsShowNotification(true))
        console.log(e)
    }
}

function* settingsSaga() {
    yield takeLeading('settings/updateUserFetch', updateUser),
        yield takeLeading('settings/updateAvatarUserFetch', updateUserAvatar)
}

export default settingsSaga
