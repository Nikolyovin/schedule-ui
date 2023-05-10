import { ICreateUser, IUser } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
  isLoading: boolean
  createUser: ICreateUser
}

const initialState: InitialStateType = {
  isLoading: false,
  createUser: {} as ICreateUser,
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    createUserFetch(state, action: PayloadAction<ICreateUser>) {
      state.isLoading = true
      // state.createUser = action.payload
      console.log('slice!')
    },
    createUserSuccess(state) {
      state.isLoading = false
    },
  },
})

export const registrationActions = registrationSlice.actions
export const registrationReducer = registrationSlice.reducer
