import { Color } from 'antd/es/color-picker'

export interface ILoginForm {
    username: string
    password: string
}

export interface IRegistrationForm {
    login: string
    // username: string
    password: string
    name: string
    color: string | Color
}

export interface ISelectColor {
    value: string
    label: string
}

export interface IUser {
    // username: string
    login: string
    password: string
    name: string
    color: string
    picture: string
    _id: string
}

export interface IItemDropdown {
    key: string
    label: string
}

export interface ICreateUser {
    login: string
    password: string
    name: string
    color: string
    picture: File | null
}

export interface ICreateEntry {
    master: string
    clientName: string
    date: Date
    time: Date
    duration: number
    description: string
}

export interface IEntry {
    master: string
    _id: string
    clientName: string
    date: Date
    time: Date
    duration: number
    description: string
}

export interface IUpdateEntry {
    master: string
    clientName: string
    date: Date
    time: Date
    duration: number
    description: string
    updateEntryId: string
}

export interface IUpdateUser {
    login: string
    password: string
    name: string
    color: string | Color
    // color: string
}

export interface IUpdateUserPayload {
    login: string
    password: string
    name: string
    color: string | Color
    userId: string
}

export interface IUpdateAvatarUserPayload {
    userId: string
    picture: File
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface INotificationData {
    type: NotificationType
    message: string
    description: string | unknown
}
