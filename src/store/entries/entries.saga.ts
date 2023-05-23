import { PayloadAction } from '@reduxjs/toolkit'
import {
  call,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects'
import { ICreateEntry } from '@/models/models'
import { URL_SERVER } from '@/common'
import { entriesActions } from './entries.slice'
import { log } from 'console'

function* workCreateEntry({ payload }: PayloadAction<ICreateEntry>): any {
  const response = yield call(() =>
    fetch(`${URL_SERVER}api/entries`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  )

  yield put(entriesActions.createEntrySuccess())
  //
  yield put(entriesActions.setIsModalOpen(false))
}

function* workGetEntry(): any {
  const response = yield call(() => fetch(`${URL_SERVER}api/entries`))
  const formattedResponse = yield response.json()
  yield put(entriesActions.getEntriesSuccess(formattedResponse))
}

function* entriesSaga() {
  yield takeLeading('entries/createEntryFetch', workCreateEntry) //имя слайса слэш название редьюсера; takeLeading слушает только на первое нажатие
  yield takeEvery('entries/getEntriesFetch', workGetEntry) //takeEvery слушает каждое изменение
}

export default entriesSaga
