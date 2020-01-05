import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutHeader from '@/layout/layoutHeader'

import Stargzing from '@/containers/stargazing'
import Details from '@/containers/details'

/*G2 全局样式*/
import { G2 } from 'bizcharts'
import GlobalTheme from '@/utils/G2.theme.js'

const { Global, Util, Theme } = G2
const { Header, Content } = Layout

const theme = Util.deepMix(GlobalTheme, Theme)

Global.setTheme(theme)

const Main = props => {
  return (
    <>
      <Header style={{ position: 'fixed', zIndex: 999, width: '100%' }}>
        <LayoutHeader />
      </Header>
      <Content className="main-containers">
        <Router />
        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route exact path="/main" component={Stargzing} />
          <Route exact path="/main/details" component={Details} />
        </Switch>
      </Content>
    </>
  )
}

export default Main
