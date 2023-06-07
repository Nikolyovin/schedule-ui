import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects'
import { ICreateEntry } from '@/models/models'
import { URL_SERVER } from '@/common'
import { entriesActions } from './entries.slice'
import { log } from 'console'

function* createEntry({ payload }: PayloadAction<ICreateEntry>): any {
    const response = yield call(() =>
        fetch(`${URL_SERVER}api/entries`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    )

    yield put(entriesActions.createEntrySuccess())
    yield put(entriesActions.setIsModalOpen(false))
}

function* getEntry(): any {
    const response = yield call(() => fetch(`${URL_SERVER}api/entries`))
    const formattedResponse = yield response.json()
    yield put(entriesActions.getEntriesSuccess(formattedResponse))
}

function* removeEntry({ payload }: PayloadAction<string>): any {
    const response = yield call(() =>
        fetch(`${URL_SERVER}api/entries/${payload}`, {
            method: 'DELETE'
        })
    )
    yield put(entriesActions.removeEntrySuccess())
}

function* entriesSaga() {
    yield takeLeading('entries/createEntryFetch', createEntry) //имя слайса слэш название редьюсера; takeLeading слушает только на первое нажатие
    yield takeEvery('entries/getEntriesFetch', getEntry) //takeEvery слушает каждое изменение
    yield takeLeading('entries/removeEntryFetch', removeEntry)
}

export default entriesSaga
