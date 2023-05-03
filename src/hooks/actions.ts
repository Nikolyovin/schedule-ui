import { loginActions } from '@/store/login/login.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const actions = {
  ...loginActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
