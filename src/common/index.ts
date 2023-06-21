import { IItemDropdown, ISelectColor } from '@/models/models'
import { MenuProps } from 'antd'

export const COLORS: ISelectColor[] = [
    { label: 'Dust Red', value: '#ff4d4f' },
    { label: 'Dust Red(light)', value: '#ffa39e' },
    { label: 'Dust Red(dark)', value: '#a8071a' },
    { label: 'Sunset Orange', value: '#ffd591' },
    { label: 'Sunset Orange(light)', value: '#ffa940' },
    { label: 'Sunset Orange(dark)', value: '#d46b08' },
    { label: 'Calendula Gold', value: '#ffc53d' },
    { label: 'Calendula Gold(light)', value: '#ffe58f' },
    { label: 'Calendula Gold(dark)', value: '#d48806' },
    { label: 'Lime', value: '#bae637' },
    { label: 'Lime(light)', value: '#eaff8f' },
    { label: 'Lime(dark)', value: '#5b8c00' },
    { label: 'Polar Green', value: '#b7eb8f' },
    { label: 'Polar Green(light)', value: '#73d13d' },
    { label: 'Polar Green(dark)', value: '#237804' },
    { label: 'Cyan', value: '#13c2c2' },
    { label: 'Cyan(light)', value: '#b5f5ec' },
    { label: 'Cyan(dark)', value: '#006d75' },
    { label: 'Daybreak Blue', value: '#4096ff' },
    { label: 'Daybreak Blue(light)', value: '#91caff' },
    { label: 'Daybreak Blue(dark)', value: '#0958d9' },
    { label: 'Golden Purple', value: '#9254de' },
    { label: 'Golden Purple(light)', value: '#d3adf7' },
    { label: 'Golden Purple(dark)', value: '#531dab' },
    { label: 'Magenta', value: '#ffadd2' },
    { label: 'Magenta(light)', value: '#f759ab' },
    { label: 'Magenta(dark)', value: '#c41d7f' }
]

// export const URL_SERVER = 'http://95.83.149.6:5100/'

export const URL_SERVER = 'http://localhost:5100/'

export const DEFAULT_COLOR = '#1677FF'
