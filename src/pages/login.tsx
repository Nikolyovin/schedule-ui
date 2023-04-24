import LoginForm from '@/components/LoginForm'
import { Row, Col, Card } from 'antd'
import React from 'react'

const login = () => {
  return (
    <Row align='middle' justify={'center'} className='h-screen '>
      <Col>
        <Card>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  )
}

export default login
