import { URL_SERVER } from '@/common'
import { call, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICreateUser } from '@/models/models'

function* workCreateUser({ payload }: PayloadAction<ICreateUser>): any {
  // console.log('SAGApayload', payload)
  let formData = new FormData()
  ///
  // formData.append('file', payload.picture.file)
  // formData.append('login', payload.login)
  // formData.append('name', payload.name)
  // formData.append('password', payload.password)
  // formData.append('color', payload.color)
  // console.log('formData', formData)
  ///
  console.log('payload.picture', payload.picture)
  // formData.append('picture', JSON.stringify(payload.picture.file))
  formData.append('picture', JSON.stringify(payload.picture.file))
  formData.append('login', 'test')
  formData.append('name', 'test')
  formData.append('password', 'test')
  formData.append('color', 'test')
  console.log('formData', formData)

  const response = yield call(() =>
    fetch(`${URL_SERVER}api/users`, {
      // mode: 'no-cors',
      method: 'POST',
      body: formData,
      // body: JSON.stringify(payload),
      headers: {
        // 'Content-Type': 'application/json',
        // 'content-type': 'multipart/form-data',
      },
    })
  )
  console.log('response', response)
}

function* registrationSaga() {
  yield takeEvery('registration/createUserFetch', workCreateUser) //имя слайса слэш название редьюсера
}

export default registrationSaga
