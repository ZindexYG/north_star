import { Layout, Card, Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogin } from '@/redux/authSlice'
import LoginStyle from './Login.module.less'
import { useEffect } from 'react'

const { Content } = Layout

const Login = () => {
  const status = useSelector(state => state.authSlice.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values: any) => {
    dispatch(fetchLogin(values))
  }

  useEffect(() => {
    if (status === 'login_succeeded') {
      navigate('/Main/Table')
    }
  }, [status])

  return (
    <Content className={LoginStyle.contianer}>
      <Card className={LoginStyle.card} title="Login" bordered={false} style={{ width: 300 }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  )
}

export default Login
