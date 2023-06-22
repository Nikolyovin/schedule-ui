import { commonActions } from '@/store/common/common.slice'
import { entriesActions } from '@/store/entries/entries.slice'
import { loginActions } from '@/store/login/login.slice'
import { registrationActions } from '@/store/registration/registration.slice'
import { settingsActions } from '@/store/settings/settings.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const actions = {
    ...loginActions,
    ...registrationActions,
    ...entriesActions,
    ...settingsActions,
    ...commonActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}
