import { ICreateEntry, IEntry, IUpdateEntry } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const LS_CURRENT_DAY_KAY = 'LS_CURRENT_DAY_KAY'

const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    return localStorage.getItem(key)
}

interface InitialStateType {
    isLoading: boolean
    isModalOpen: boolean
    entries: IEntry[]
    isFetching: boolean
    currentDay: Date | null
    isNew: boolean
    updateEntryId: string
}

const initialState: InitialStateType = {
    isLoading: false,
    isModalOpen: false,
    entries: {} as IEntry[],
    isFetching: false,
    currentDay: getFromLocalStorage(LS_CURRENT_DAY_KAY)
        ? JSON.parse(getFromLocalStorage(LS_CURRENT_DAY_KAY) || 'null')
        : [],
    isNew: true,
    updateEntryId: ''
}

export const entriesSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        createEntryFetch(state, action: PayloadAction<ICreateEntry>) {
            state.isLoading = true
        },
        createEntrySuccess(state) {
            state.isLoading = false
        },
        setIsModalOpen(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload
        },
        setIsNew(state, action: PayloadAction<boolean>) {
            state.isNew = action.payload
        },
        getEntriesFetch(state) {
            state.isLoading = true
        },
        getEntriesSuccess(state, action: PayloadAction<IEntry[]>) {
            state.entries = action.payload
            state.isLoading = false
        },
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        setCurrentDay(state, action: PayloadAction<Date>) {
            state.currentDay = action.payload
            localStorage.setItem(LS_CURRENT_DAY_KAY, JSON.stringify(state.currentDay))
        },
        removeEntryFetch(state, action: PayloadAction<string>) {
            state.isLoading = true
        },
        removeEntrySuccess(state) {
            state.isLoading = false
        },
        updateEntryFetch(state, action: PayloadAction<IUpdateEntry>) {
            // console.log('action', action)
            state.isNew = false
            state.isLoading = true
        },
        updateEntrySuccess(state, action: PayloadAction<IUpdateEntry>) {
            state.isNew = true
            state.isLoading = false
            const { updateEntryId, clientName, date, description, duration, master, time } = action.payload
            state.entries = state.entries.map(entry =>
                entry._id === action.payload.updateEntryId
                    ? { ...entry, updateEntryId, clientName, date, description, duration, master, time }
                    : entry
            )
        },
        setUpdateEntryId(state, action: PayloadAction<string>) {
            state.updateEntryId = action.payload
        }
    }
})

export const entriesActions = entriesSlice.actions
export const entriesReducer = entriesSlice.reducer
