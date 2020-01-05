import React, { memo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Dropdown, Icon, Menu, Tooltip, message } from 'antd'
import IconFont from '@/componetns/iconFont'
import './layoutHeader.less'
import { modalShow, logout, auth_status,InitAuthStatus } from './reducer.js'

const LayoutHeader = props => {
  const MenuItem = Menu.Item
  const dispatch = useDispatch()
  const history = useHistory()
  const AuthStatus = useSelector(auth_status)

  const { user_account, lstRole = '管理员' } = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
    if (AuthStatus.status !== '') {
      const { status, msg, userInfo } = AuthStatus
      // console.log('userInfo',userInfo)
      status === 'success' &&
        !userInfo &&
        (() => {
          // dispatch(InitGetUserInfo())
          localStorage.clear()
          history.push('/login')
        })()
      message[status](msg)

      dispatch(InitAuthStatus())
    }
  }, [AuthStatus.status, AuthStatus, dispatch, history])

  /* 下拉 */
  const userSelectNofilter = [
    {
      name: `${user_account}(${lstRole})`,
      onclick: null
    },
    {
      name: '退出系统',
      onclick: () => {
        dispatch(logout())
      }
    }
  ]
  // right-icon
  const headerIndexNofilter = [
    {
      title: '观星台',
      listDom: <Icon type="dashboard" />,
      onclick: () => {
        history.push('/main/stargzing')
      }
    },
    {
      title: '公告',
      listDom: <Icon type="sound" />,
      onclick: () => {
        // dispatch(modalShow({ type: 'notice' }))
      }
    },
    {
      title: null,
      listDom: (
        <Dropdown
          className="user-msg"
          overlay={
            <Menu className="user-dropdown">
              {userSelectNofilter.map((user, key) => (
                <MenuItem key={key} className="user-item">
                  <span onClick={user.onclick}>{`${user.name}`}</span>
                </MenuItem>
              ))}
            </Menu>
          }>
          <span className="ant-dropdown-link">
            <IconFont type="icon-icon-user" style={{ color: '#fff' }} />
          </span>
        </Dropdown>
      ),
      onclick: null
    }
  ]

  // title
  const titleContent = {
    '/': '个人中心',
    '/main': '个人中心'
  }

  return (
    <Row className="header-container" type="flex" justify="space-between" align="middle" gutter={16}>
      <Col xl={4} lg={5} md={6}>
        <h1
          className="header-left"
          onClick={() => {
            sessionStorage.clear()
            window.location.replace(`${window.location.origin}/main/laboratory/list`)
          }}>
          <div className="logo" />
        </h1>
      </Col>
      <Col xl={12} lg={12} md={12}>
        <div className="middle">{titleContent[window.location.pathname]}</div>
      </Col>
      <Col xl={4} lg={5} md={6}>
        <div className="header-right">
          {headerIndexNofilter.map((item, key) =>
            item.title ? (
              <Tooltip className="header-item" placement="bottom" title={item.title} key={key}>
                <span onClick={item.onclick}>{item.listDom}</span>
              </Tooltip>
            ) : (
              <span className="header-item msg-wrapper" key={key}>
                {item.listDom}
              </span>
            )
          )}
        </div>
      </Col>
    </Row>
  )
}

export default LayoutHeader
