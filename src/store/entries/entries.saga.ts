import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects'
import { ICreateEntry, IUpdateEntry } from '@/models/models'
import { entriesActions } from './entries.slice'
import EntryService from '@/services/EntryService'
import { NotificDescrip, NotificMes, NotificType, notificationError } from '@/common'
import { commonActions } from '../common/common.slice'

function* createEntryFetch({ payload }: PayloadAction<ICreateEntry>): any {
    try {
        const response = yield call(() => EntryService.create(payload))
        yield put(entriesActions.createEntrySuccess())
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
        console.log('error:', e)
    }
}

function* createEntrySuccess(): any {
    const notificationData = {
        type: NotificType.SUCCESS,
        message: NotificMes.SUCCESS,
        description: NotificDescrip.CREATE_ENTRY
    }
    yield put(commonActions.setNotificationData(notificationData))
    yield put(commonActions.setIsShowNotification(true))
}

function* getEntries(): any {
    try {
        const response = yield call(() => EntryService.getAll())
        yield put(entriesActions.getEntriesSuccess(response.data))
    } catch (e: any) {
        throw e
    }
}

function* removeEntryFetch({ payload }: PayloadAction<string>): any {
    try {
        const response = yield call(() => EntryService.delete(payload))
        yield put(entriesActions.removeEntrySuccess())
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
    }
}

function* removeEntrySuccess(): any {
    const notificationData = {
        type: NotificType.SUCCESS,
        message: NotificMes.SUCCESS,
        description: NotificDescrip.REMOVE_ENTRY
    }
    yield put(commonActions.setNotificationData(notificationData))
    yield put(commonActions.setIsShowNotification(true))
}

function* updateEntryFetch({ payload }: PayloadAction<IUpdateEntry>): any {
    try {
        const { clientName, date, description, duration, master, time, updateEntryId } = payload
        const response = yield call(() =>
            EntryService.update(updateEntryId, { clientName, date, description, duration, master, time })
        )
        yield put(entriesActions.updateEntrySuccess())
    } catch (e: any) {
        yield put(commonActions.setNotificationData(notificationError(e)))
        yield put(commonActions.setIsShowNotification(true))
    }
}

function* updateEntrySuccess(): any {
    const notificationData = {
        type: NotificType.SUCCESS,
        message: NotificMes.SUCCESS,
        description: NotificDescrip.UPDATE_ENTRY
    }
    yield put(commonActions.setNotificationData(notificationData))
    yield put(commonActions.setIsShowNotification(true))
}

function* entriesSaga() {
    yield takeLeading('entries/createEntryFetch', createEntryFetch) //takeLeading слушает только на первое нажатие
    yield takeLeading('entries/createEntrySuccess', createEntrySuccess)
    yield takeEvery('entries/getEntriesFetch', getEntries) //takeEvery слушает каждое изменение
    yield takeLeading('entries/removeEntryFetch', removeEntryFetch)
    yield takeLeading('entries/removeEntrySuccess', removeEntrySuccess)
    yield takeLeading('entries/updateEntryFetch', updateEntryFetch)
    yield takeLeading('entries/updateEntrySuccess', updateEntrySuccess)
}

export default entriesSaga
