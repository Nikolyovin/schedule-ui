import { URL_SERVER } from '@/common'
import { call, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICreateUser } from '@/models/models'
import { registrationActions } from './registration.slice'

function* workCreateUser({ payload }: PayloadAction<ICreateUser>): any {
  let formData = new FormData()

  formData.append('picture', payload.picture)
  formData.append('login', payload.login)
  formData.append('name', payload.name)
  formData.append('password', payload.password)
  formData.append('color', payload.color)
  console.log('formData', formData)

  const response = yield call(() =>
    fetch(`${URL_SERVER}api/users`, {
      method: 'POST',
      body: formData,
    })
  )
  console.log('response', response)
  yield put(registrationActions.createUserSuccess())
  yield put(registrationActions.isPushChange(true))
}

function* registrationSaga() {
  yield takeEvery('registration/createUserFetch', workCreateUser) //имя слайса слэш название редьюсера
}

export default registrationSaga
