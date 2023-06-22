import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { INotificationData, NotificationType } from '@/models/models'
import { notification } from 'antd'
import React, { FC, useEffect } from 'react'

interface IProps {}

const NotificationApp: FC = () => {
    const { isShowNotification, notificationData } = useAppSelector(state => state.common)
    const { setNotificationData, setIsShowNotification } = useActions()
    const [api, contextHolder] = notification.useNotification()

    const { description, message, type } = notificationData

    console.log()

    useEffect(() => {
        if (isShowNotification) {
            openNotificationWithIcon()
            setNotificationData({} as INotificationData)
            setIsShowNotification(false)
        }
        // setNotificationData({} as INotificationData)
    }, [isShowNotification])

    const openNotificationWithIcon = () => {
        api[type]({
            message: message,
            description: description
        })
    }

    return <>{contextHolder}</>
}

export default NotificationApp
