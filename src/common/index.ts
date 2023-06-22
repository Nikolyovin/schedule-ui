// export const URL_SERVER = 'http://95.83.149.6:5100/'

export const URL_SERVER = 'http://localhost:5100/'

export const DEFAULT_COLOR = '#1677FF'

export const COLORS = {
    label: 'Recommended',
    colors: [
        '#ff4d4f',
        '#ffa39e',
        '#a8071a',
        '#ffd591',
        '#ffa940',
        '#d46b08',
        '#ffe58f',
        '#d48806',
        '#bae637',
        '#eaff8f',
        '#5b8c00',
        '#b7eb8f',
        '#73d13d',
        '#237804',
        '#13c2c2',
        '#b5f5ec',
        '#006d75',
        '#4096ff',
        '#91caff',
        '#0958d9',
        '#9254de',
        '#d3adf7',
        '#531dab',
        '#ffadd2',
        '#f759ab',
        '#c41d7f',
        '#ea80fc',
        '#ffca28',
        '#a1887f',
        '#9e9e9e'
    ]
}

export enum NotificationTypeEnum {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}

export enum NotificationMessage {
    SUCCESS = 'Успешно!',
    WARNING = 'Внимание!',
    ERROR = 'Ошибка!'
}

export enum NotificationDescription {
    UPDATE_USER_SUCCESS = 'Настройки пользователя успешно сохранены!',
    UPDATE_USER_PHOTO_SUCCESS = 'Фотография пользователя успешно изменена!'
}
