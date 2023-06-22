import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from './login/login.slice'
import { registrationReducer } from './registration/registration.slice'
import rootSaga from './rootSaga'
import { entriesReducer } from './entries/entries.slice'
import { settingsReducer } from './settings/settings.slice'
import { commonReducer } from './common/common.slice'

const saga = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        login: loginReducer,
        registration: registrationReducer,
        entries: entriesReducer,
        settings: settingsReducer,
        common: commonReducer
    },
    middleware: [saga]
})

saga.run(rootSaga)

//создаем чтобы знать с какими данными работать в стейте, need for useAppSelector
export type RootState = ReturnType<typeof store.getState>
