import Header from '@/components/common/Header'
import { useAppSelector } from '@/hooks/redux'
import { Card } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import FormSettings from './FormSettings/FormSettings'
import AvatarSettings from './FormSettings/AvatarSettings/AvatarSettings'
import { useWindowSize } from '@/hooks/windowSize'
import dynamic from 'next/dynamic'

const Settings = () => {
    const { activeUser } = useAppSelector(state => state.login)
    const router = useRouter()
    const { width } = useWindowSize()

    useEffect(() => {
        if (Object.keys(activeUser).length === 0) {
            router.push({
                pathname: '/login'
            })
        }
    }, [activeUser])

    const lgScreen = 641 < width && width <= 1281
    const xlScreen = width > 1281
    const smScreen = width < 641

    console.log(lgScreen, xlScreen, smScreen);
    

    const styleCard = () => {
        if (lgScreen) return { width: 500, maxHeight: 650 }
        if (xlScreen) return { width: 700, maxHeight: 750 }
        if (smScreen) return { width: 300, maxHeight: 560 }
    }

    return (
        <>
            <Header />
            <div className='min-h-[calc(100vh-var(--header-height))] w-[100%] flex justify-center items-center  bg-slate-50'>
                <Card title='Мои настройки' style={styleCard()}>
                    <AvatarSettings activeUserId={activeUser._id} />
                    <FormSettings activeUser={activeUser} />
                </Card>
            </div>
        </>
    )
}

// export default Settings
export default dynamic(() => Promise.resolve(Settings), { ssr: false })
