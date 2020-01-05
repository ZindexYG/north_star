import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, message, Row, Col, Icon } from 'antd'
import ReactCanvasNest from 'react-canvas-nest'
// import IconFont from '@/componetns/iconFont'
import { Login as LoginDispatch, auth_status, getUserInfo, } from './reducer'
import './index.less'

const FormItem = Form.Item

const Login = props => {
  const { getFieldDecorator, validateFields } = props.form
  const dispatch = useDispatch()
  const history = useHistory()

  // 登录状态
  const AuthStatus = useSelector(auth_status)
  // 个人信息
  const GetUserInfo = useSelector(getUserInfo)

  const { status, msg, userInfo } = AuthStatus

  useEffect(() => {
    status === 'error' && message[status](msg)
    // status === 'success' && dispatch(GetUserById({ userId: userInfo.userId }))
    status === 'success' &&
      (() => {
        message[status](msg)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        history.push('/main')
      })()
    // dispatch(InitAuthStatus())
  }, [AuthStatus.status, AuthStatus, dispatch, msg, status, userInfo,history])

  // useEffect(() => {
  //   const { userInfo } = AuthStatus
  //   const { status, msg } = GetUserInfo
  //   status === 'error' && message[status](msg)
  //   status === 'success' &&
  //     (() => {

  //       // if (userInfo) {}
  //       userInfo &&
  //         localStorage.setItem(
  //           'userInfo',
  //           JSON.stringify(
  //             Object.assign({}, userInfo, GetUserInfo.userInfo, {
  //               loginDate: new Date().getTime()
  //             })
  //           )
  //         )
  //       // userInfo && (userInfo.userAccount === 'huangqiyou' ? history.push('/main/enshrine') : history.push('/main'))
  //     })()

  //   status !== '' && dispatch(InitGetUserInfo())
  // }, [GetUserInfo.status, GetUserInfo, AuthStatus, history, dispatch])

  const [waggle, setWaggle] = useState({
    'animate-left': 'fadeInUp animated delay-05s',
    'animate-right': 'fadeInUp animated delay-1s',
    'animate-bottom': 'fadeInUp animated fast',
    'animate-bottom-light': 'hide',
    'animate-top-light': 'hide',
    'animate-1': 'fadeInLeft animated delay-1s',
    'animate-2': 'fadeInDown animated delay-1s',
    'animate-3': 'fadeInRight animated delay-1s',
    'animate-4': 'fadeInUp animated  delay-1s'
  })

  useEffect(() => {
    setTimeout(() => {
      setWaggle({
        'animate-left': 'waggle up-left',
        'animate-right': 'waggle up-right',
        'animate-bottom': 'waggle ',
        'animate-bottom-light': 'waggle lightning',
        'animate-top-light': 'waggle lightning',
        'animate-1': 'waggle',
        'animate-2': 'waggle',
        'animate-3': 'waggle',
        'animate-4': 'waggle up-down'
      })
    }, 2000)
  }, [])

  // 登录
  const handleSubmit = e => {
    e.preventDefault()
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { userAccount, password } = values
        const params = {
          userAccount,
          password: btoa(password)
        }
        dispatch(LoginDispatch(params))
      }
    })
  }

  // 帐户校验
  const NumOrChar = (rule, value, callback) => {
    const pattern = /^[0-9a-zA-Z]+$/
    if (value !== '' && !pattern.exec(value)) {
      callback('请按要求填写帐户!')
    } else {
      callback()
    }
  }
  return (
    <div className="login-container">
      <ReactCanvasNest
        className="canvasNest"
        config={{ pointR: 5, lineWidth: 3, pointColor: ' 39,52,89', lineColor: '39,52,89', count: 25 }}
        style={{ zIndex: -1 }}
      />
      <Row gutter={[0, 0]} type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
        <Col {...{ xl: 14, lg: 14, md: 10, sm: 8 }} className="container left">
          <div className="login-animate-container">
            <div className={`animate-top-light ${waggle['animate-top-light']}`} />
            <div className={`animate-left ${waggle['animate-left']}`} />
            <div className={`animate-right ${waggle['animate-right']}`} />
            <div className={`animate-bottom ${waggle['animate-bottom']}`} />
            <div className={`animate-bottom-light ${waggle['animate-bottom-light']}`} />
            <div className={`animate animate-1 ${waggle['animate-1']}`} />
            <div className={`animate animate-2 ${waggle['animate-2']}`} />
            <div className={`animate animate-3 ${waggle['animate-3']}`} />
            <div className={`animate animate-4 ${waggle['animate-4']}`} />
          </div>
        </Col>
        <Col {...{ xl: 10, lg: 10, md: 14, sm: 16 }} className="container right">
          <Form
            className="login-form-container"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 24 }
            }}
            onSubmit={e => handleSubmit(e)}>
            <h1 className="login-log-title">North Star</h1>
            <FormItem>
              {getFieldDecorator('userAccount', {
                rules: [
                  {
                    required: true,
                    min: 1,
                    max: 50,
                    message: '请输入正确的帐户!'
                  },
                  {
                    validator: NumOrChar
                  }
                ]
              })(<Input autoComplete="off" size="large" placeholder="admin" prefix={<Icon type="user" />} />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入登录密码'
                  }
                ]
              })(
                <Input
                  autoComplete="off"
                  size="large"
                  type="password"
                  placeholder="12345"
                  prefix={<Icon type="lock" />}
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                className="login-form-button"
                type="primary"
                htmlType="submit"
                block
                loading={GetUserInfo.status === 'loading' || AuthStatus.status === 'loading'}>
                登录
              </Button>
            </FormItem>
            <span className="container-border top-left" />
            <span className="container-border top-right" />
            <span className="container-border bottom-left" />
            <span className="container-border bottom-right" />
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Form.create()(Login)
