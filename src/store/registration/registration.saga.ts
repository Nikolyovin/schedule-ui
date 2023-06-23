import { NotificDescrip, NotificMes, NotificType, URL_SERVER, notificationError } from '@/common'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICreateUser } from '@/models/models'
import { registrationActions } from './registration.slice'
import UserService from '@/services/UserService'
import { commonActions } from '../common/common.slice'

function* workCreateUserFetch({ payload }: PayloadAction<ICreateUser>): any {
    try {
        let formData = new FormData()

        formData.append('picture', payload.picture as any)
        formData.append('login', payload.login)
        formData.append('name', payload.name)
        formData.append('password', payload.password)
        formData.append('color', payload.color)

        const response = yield call(() => UserService.create(formData))

        yield put(registrationActions.createUserSuccess())
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
        console.log(e)
    }
}

function* workCreateUserSuccess(): any {
    const notificationData = {
        type: NotificType.SUCCESS,
        message: NotificMes.SUCCESS,
        description: NotificDescrip.CREATE_USER
    }
    yield put(commonActions.setNotificationData(notificationData))
    yield put(commonActions.setIsShowNotification(true))
}

function* registrationSaga() {
    yield takeLatest('registration/createUserFetch', workCreateUserFetch) //имя слайса слэш название редьюсера
    yield takeLatest('registration/createUserSuccess', workCreateUserSuccess)
}

export default registrationSaga
