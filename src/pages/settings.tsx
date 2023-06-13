import Header from '@/components/Home/Header/Header'
import { useAppSelector } from '@/hooks/redux'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Settings = () => {
    const { activeUser } = useAppSelector(state => state.login)
    const router = useRouter()

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
            <div>settings</div>
        </>
    )
}

export default Settings
