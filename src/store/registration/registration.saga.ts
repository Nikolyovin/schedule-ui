import { URL_SERVER } from '@/common'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICreateUser } from '@/models/models'
import { registrationActions } from './registration.slice'
import UserService from '@/services/UserService'

function* workCreateUser({ payload }: PayloadAction<ICreateUser>): any {
    let formData = new FormData()

    formData.append('picture', payload.picture as any)
    formData.append('login', payload.login)
    formData.append('name', payload.name)
    formData.append('password', payload.password)
    formData.append('color', payload.color)

    const response = yield call(() => UserService.create(formData))
    yield put(registrationActions.createUserSuccess())
    yield put(registrationActions.isPushChange(true))
}

function* registrationSaga() {
    yield takeLatest('registration/createUserFetch', workCreateUser) //имя слайса слэш название редьюсера
}

export default registrationSaga
