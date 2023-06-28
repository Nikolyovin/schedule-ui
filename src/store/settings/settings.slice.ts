import { IUpdateAvatarUserPayload, IUpdateUserPayload } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
    isLoading: boolean
}

const initialState: InitialStateType = {
    isLoading: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateUserFetch(state) {
            state.isLoading = true
        },
        updateUserSuccess(state) {
            state.isLoading = false
        },
        updateAvatarUserFetch(state, action: PayloadAction<IUpdateAvatarUserPayload>) {
            state.isLoading = true
        },
        updateAvatarUserSuccess(state) {
            state.isLoading = false
        }
    }
})

export const settingsActions = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
