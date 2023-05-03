import { IUser } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
  auth: boolean
  users: IUser[]
  isLoading: boolean
  activeUser: IUser
}

const initialState: InitialStateType = {
  auth: false,
  users: {} as IUser[],
  isLoading: false,
  activeUser: {} as IUser,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setActiveUser(state, action: PayloadAction<IUser>) {
      state.activeUser = action.payload
    },
    getUsersFetch(state) {
      state.isLoading = true
    },
    getUsersSuccess(state, action: PayloadAction<IUser[]>) {
      console.log('action.payload:', action.payload)

      state.users = action.payload
      state.isLoading = false
    },
  },
})

export const loginActions = loginSlice.actions
export const loginReducer = loginSlice.reducer
