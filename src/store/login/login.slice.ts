import { IUser } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const LS_USERS_KEY = 'LS_USERS_KEY'
const LS_ACTIVE_USER_KEY = 'LS_ACTIVE_USER_KEY'

// нужно для решение ошибки  localStorage is not defined
const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return ''
  }
  return localStorage.getItem(key)
}

interface InitialStateType {
  auth: boolean
  users: IUser[]
  isLoading: boolean
  activeUser: IUser
  // currentUser: string
}

const initialState: InitialStateType = {
  auth: false,
  // users: {} as IUser[],
  // users: JSON.parse(localStorage.getItem(LS_USERS_KEY) ?? '[]'),
  users: getFromLocalStorage(LS_USERS_KEY)
    ? JSON.parse(getFromLocalStorage(LS_USERS_KEY) || '{}')
    : [],
  isLoading: false,
  // activeUser: {} as IUser,
  activeUser: getFromLocalStorage(LS_ACTIVE_USER_KEY)
    ? JSON.parse(getFromLocalStorage(LS_ACTIVE_USER_KEY) || '{}')
    : [],
  // currentUser: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setActiveUser(state, action: PayloadAction<IUser>) {
      state.activeUser = action.payload
      localStorage.setItem(LS_ACTIVE_USER_KEY, JSON.stringify(state.activeUser))
    },
    getUsersFetch(state) {
      state.isLoading = true
    },
    getUsersSuccess(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload
      localStorage.setItem(LS_USERS_KEY, JSON.stringify(state.users))
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
