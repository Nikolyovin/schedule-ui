import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
// import letterSaga from './alphabet/alphabet.saga'
import { loginReducer } from './login/login.slice'
import loginSaga from './login/login.saga'

const saga = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: [saga],
})

saga.run(loginSaga)

//создаем чтобы знать с какими данными работать в стейте, need for useAppSelector
export type RootState = ReturnType<typeof store.getState>
