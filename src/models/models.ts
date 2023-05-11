export interface ILoginForm {
  username: string
  password: string
}

export interface IRegistrationForm {
  username: string
  password: string
  firstName: string
  color?: string
}

export interface ISelectColor {
  value: string
  label: string
}

export interface IUser {
  username: string
  password: string
  name: string
  color?: string
  picture?: string
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
  color?: string
  picture?: string
}