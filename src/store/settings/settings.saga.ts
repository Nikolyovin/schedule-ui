import { IUpdateAvatarUserPayload, IUpdateUserPayload } from '@/models/models'
import UserService from '@/services/UserService'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { settingsActions } from './settings.slice'
import { loginActions } from '../login/login.slice'
import { NotificationDescription, NotificationMessage, NotificationTypeEnum, URL_SERVER } from '@/common'
import { commonActions } from '../common/common.slice'
import { notification } from 'antd'

function* updateUser({ payload }: PayloadAction<IUpdateUserPayload>): any {
    try {
        const { userId, color, login, name, password } = payload
        const response = yield call(() => UserService.update(userId, { color, login, name, password }))
        yield put(settingsActions.updateUserSuccess())
        yield put(loginActions.setActiveUser(response.data))
        yield put(loginActions.getUsersFetch())
        const notificationData = {
            type: NotificationTypeEnum.SUCCESS,
            message: NotificationMessage.SUCCESS,
            description: NotificationDescription.UPDATE_USER_SUCCESS
        }
        yield put(commonActions.setNotificationData(notificationData))
        yield put(commonActions.setIsShowNotification(true))
    } catch (e: any) {
        const notificationError = {
            type: NotificationTypeEnum.ERROR,
            message: NotificationMessage.ERROR,
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
            type: NotificationTypeEnum.SUCCESS,
            message: NotificationMessage.SUCCESS,
            description: NotificationDescription.UPDATE_USER_PHOTO_SUCCESS
        }
        yield put(commonActions.setNotificationData(notificationData))
        yield put(commonActions.setIsShowNotification(true))
    } catch (e: any) {
        const notificationError = {
            type: NotificationTypeEnum.ERROR,
            message: NotificationMessage.ERROR,
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
