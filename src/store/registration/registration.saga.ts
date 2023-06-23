import { NotificDescrip, NotificMes, NotificType, URL_SERVER, notificationError } from '@/common'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICreateUser } from '@/models/models'
import { registrationActions } from './registration.slice'
import UserService from '@/services/UserService'
import { commonActions } from '../common/common.slice'

function* workCreateUser({ payload }: PayloadAction<ICreateUser>): any {
    try {
        let formData = new FormData()

        formData.append('picture', payload.picture as any)
        formData.append('login', payload.login)
        formData.append('name', payload.name)
        formData.append('password', payload.password)
        formData.append('color', payload.color)

        const response = yield call(() => UserService.create(formData))
        console.log('response', response)

        yield put(registrationActions.isPushChange(true))
        yield put(registrationActions.createUserSuccess())

        const notificationData = {
            type: NotificType.SUCCESS,
            message: NotificMes.SUCCESS,
            description: NotificDescrip.CREATE_USER
        }
        yield put(commonActions.setNotificationData(notificationData))
        yield put(commonActions.setIsShowNotification(true))
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
        console.log(e)
    }
}

function* registrationSaga() {
    yield takeLatest('registration/createUserFetch', workCreateUser) //имя слайса слэш название редьюсера
}

export default registrationSaga
