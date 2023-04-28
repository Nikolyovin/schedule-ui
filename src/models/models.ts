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
