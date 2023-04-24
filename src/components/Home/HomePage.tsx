import { Layout } from 'antd'
import React from 'react'
import Header from './Header/Header'
import Content from './Content/Content'

const HomePage = () => {
  return (
    <Layout className='layout'>
      <Header />
      <Content />
    </Layout>
  )
}

export default HomePage
