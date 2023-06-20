import { IUpdateAvatarUserPayload, IUpdateUserPayload } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
    isLoading: boolean
    // isUpdate: boolean
}

const initialState: InitialStateType = {
    isLoading: false
    // isUpdate: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateUserFetch(state, action: PayloadAction<IUpdateUserPayload>) {
            state.isLoading = true
        },
        updateUserSuccess(state) {
            // state.isUpdate = true
            state.isLoading = false
        },
        updateAvatarUserFetch(state, action: PayloadAction<IUpdateAvatarUserPayload>) {
            state.isLoading = true
        },
        updateAvatarUserSuccess(state) {
            state.isLoading = false
        }
        // setUpdateActiveUser(state, action: PayloadAction<string>) {}
    }
})

export const settingsActions = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
