import { Layout } from 'antd'
import React, { FC, useEffect } from 'react'
import Header from '../common/Header'
import Content from './Content/Content'
import { useAppSelector } from '@/hooks/redux'
import { useRouter } from 'next/router'

const HomePage: FC = () => {
    const router = useRouter()
    const { activeUser } = useAppSelector(state => state.login)

    useEffect(() => {
        if (Object.keys(activeUser).length === 0) {
            router.push({
                pathname: '/login'
            })
        }
    }, [activeUser])

    return (
        <Layout className='layout'>
            <Header />
            <Content />
        </Layout>
    )
}

export default HomePage
