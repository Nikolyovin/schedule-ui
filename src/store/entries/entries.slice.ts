import { ICreateEntry, IEntry } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
  isLoading: boolean
  isModalOpen: boolean
  entries: IEntry[]
  isFetching: boolean
}

const initialState: InitialStateType = {
  isLoading: false,
  isModalOpen: false,
  entries: {} as IEntry[],
  isFetching: false,
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
  },
})

export const entriesActions = entriesSlice.actions
export const entriesReducer = entriesSlice.reducer
