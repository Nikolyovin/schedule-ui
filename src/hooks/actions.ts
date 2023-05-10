import { loginActions } from '@/store/login/login.slice'
import { registrationActions } from '@/store/registration/registration.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const actions = {
  ...loginActions,
  ...registrationActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
