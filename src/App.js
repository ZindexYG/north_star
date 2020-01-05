import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { ConfigProvider, message } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

// view
import Login from '@/views/login' /*登录*/
import Main from '@/views/main' /*主界面*/

//全局配置消息最多显示一个
message.config({
  maxCount: 1,
  top: 64
})

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return localStorage.getItem('userInfo') ? <Component {...props} /> : <Redirect to="/login" />
    }}
  />
)
// 有登录信息的跳转 用于判断是否可以进入 login 页面
const UnAuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('userInfo') ? <Redirect to="/main" /> : <Component {...props} />)}
  />
)

const App = props => {
  return (
    <ConfigProvider locale={zh_CN}>
      <div className="app">
        <Router>
          <Switch>
            <UnAuthRoute path="/login" component={Login} />
            <AuthRoute exact path="/" component={Main} />
            <AuthRoute path="/main" component={Main} />Ï
          </Switch>
        </Router>
      </div>
    </ConfigProvider>
  )
}

export default App
