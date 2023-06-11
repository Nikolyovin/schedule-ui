import HomePage from '@/components/Home/HomePage'
import React from 'react'
import 'moment/locale/ru'
import RU from 'antd/lib/locale/ru_RU'
import { ConfigProvider } from 'antd'

const Home = () => {
  return (
    // <ConfigProvider locale={RU}>
    <HomePage />
    // </ConfigProvider>
  )

  // return <div>error</div>
}

export default Home
