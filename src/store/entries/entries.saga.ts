import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects'
import { ICreateEntry, IUpdateEntry } from '@/models/models'
import { entriesActions } from './entries.slice'
import EntryService from '@/services/EntryService'

function* createEntry({ payload }: PayloadAction<ICreateEntry>): any {
    try {
        const response = yield call(() => EntryService.create(payload))
        yield put(entriesActions.createEntrySuccess())
        yield put(entriesActions.setIsModalOpen(false))
    } catch (error) {
        throw error
    }
}

function* getEntries(): any {
    try {
        const response = yield call(() => EntryService.getAll())
        yield put(entriesActions.getEntriesSuccess(response.data))
    } catch (error) {
        throw error
    }
}

function* removeEntry({ payload }: PayloadAction<string>): any {
    try {
        const response = yield call(() => EntryService.delete(payload))
        yield put(entriesActions.removeEntrySuccess())
    } catch (error) {
        throw error
    }
}

function* updateEntry({ payload }: PayloadAction<IUpdateEntry>): any {
    const { clientName, date, description, duration, master, time, updateEntryId } = payload
    const response = yield call(() =>
        EntryService.update(updateEntryId, { clientName, date, description, duration, master, time })
    )
    // yield put(entriesActions.updateEntrySuccess(response.data))
    yield put(entriesActions.setIsModalOpen(false))
}

function* entriesSaga() {
    yield takeLeading('entries/createEntryFetch', createEntry) //имя слайса слэш название редьюсера; takeLeading слушает только на первое нажатие
    yield takeEvery('entries/getEntriesFetch', getEntries) //takeEvery слушает каждое изменение
    yield takeLeading('entries/removeEntryFetch', removeEntry)
    yield takeLeading('entries/updateEntryFetch', updateEntry)
}

export default entriesSaga
