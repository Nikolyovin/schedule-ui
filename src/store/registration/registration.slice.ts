import { IUser } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
  isLoading: boolean
}

const initialState: InitialStateType = {
  isLoading: false,
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    createUserFetch(state) {
      state.isLoading = true
    },
    createUserSuccess(state) {
      state.isLoading = false
    },
  },
})

export const registrationActions = registrationSlice.actions
export const registrationReducer = registrationSlice.reducer
