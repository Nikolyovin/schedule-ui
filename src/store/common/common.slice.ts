import { INotificationData } from '@/models/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialStateType {
    notificationData: INotificationData
    isShowNotification: boolean
}

const initialState: InitialStateType = {
    notificationData: {} as INotificationData,
    isShowNotification: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setNotificationData(state, action: PayloadAction<INotificationData>) {
            state.notificationData = action.payload
            // state.createUser = action.payload
        },
        setIsShowNotification(state, action: PayloadAction<boolean>) {
            state.isShowNotification = action.payload
        }
    }
})

export const commonActions = commonSlice.actions
export const commonReducer = commonSlice.reducer
