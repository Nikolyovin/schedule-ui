import { ICreateUser, IUser } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
    isLoading: boolean
    createUser: ICreateUser
    isPush: boolean
}

const initialState: InitialStateType = {
    isLoading: false,
    createUser: {} as ICreateUser,
    isPush: false
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        createUserFetch(state, action: PayloadAction<ICreateUser>) {
            state.isLoading = true
            // state.createUser = action.payload
        },
        createUserSuccess(state) {
            state.isLoading = false
            state.isPush = true
        },
        isPushChange(state, action: PayloadAction<boolean>) {
            state.isPush = action.payload
        }
    }
})

export const registrationActions = registrationSlice.actions
export const registrationReducer = registrationSlice.reducer
