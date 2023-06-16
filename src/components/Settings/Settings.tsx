import Header from '@/components/Home/Header/Header'
import RegistrationForm from '@/components/Registration/RegistrationForm/RegistrationForm'
import { useAppSelector } from '@/hooks/redux'
import { Button, Card, Form, Input, Row, Select, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import TheAvatar from '../common/TheAvatar'
import FormSettings from './FormSettings/FormSettings'
import { useActions } from '@/hooks/actions'

const Settings = () => {
    const { activeUser, users } = useAppSelector(state => state.login)
    // const { isLoading, isUpdate } = useAppSelector(state => state.settings)
    // const { getUsersFetch, setActiveUser, setIsUpdate } = useActions()
    const router = useRouter()
    // console.log('users', users)
    // console.log('activeUser', activeUser)

    // useEffect(() => {
    //     console.log('users', users)
    //     // console.log('activeUser', activeUser)
    //     getUsersFetch()
    //     if (isUpdate) {
    //         const currentUser = users.find(user => user._id === activeUser._id)
    //         console.log('currentUser', currentUser)
    //         setActiveUser(currentUser)
    //         // isUpdate
    //         setIsUpdate(false)
    //     }
    // }, [isLoading])

    useEffect(() => {
        if (Object.keys(activeUser).length === 0) {
            router.push({
                pathname: '/login'
            })
        }
    }, [activeUser])

    return (
        <>
            <Header />
            <div className='min-h-[calc(100vh-64px)] w-[100%] flex justify-center  bg-slate-50'>
                <Card title='Мои настройки' style={{ width: 700, maxHeight: 750, marginTop: 50 }}>
                    <div className='flex justify-center mb-5'>
                        <TheAvatar size={200} />
                    </div>
                    <FormSettings activeUser={activeUser} />
                </Card>
            </div>
        </>
    )
}

export default Settings
