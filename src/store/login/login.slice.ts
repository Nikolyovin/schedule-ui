import { IUser } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
  auth: boolean
  users: IUser[]
  isLoading: boolean
  activeUser: IUser
  // currentUser: string
}

const initialState: InitialStateType = {
  auth: false,
  users: {} as IUser[],
  isLoading: false,
  activeUser: {} as IUser,
  // currentUser: '',
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
      state.users = action.payload
      state.isLoading = false
    },
    setIsLoadingLogin(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    // setCurrentUser(state, action: PayloadAction<string>) {
    //   state.currentUser = action.payload
    // },
  },
})

export const loginActions = loginSlice.actions
export const loginReducer = loginSlice.reducer
