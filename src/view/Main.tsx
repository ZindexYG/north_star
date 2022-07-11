import { useEffect, useState } from 'react'
// router
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// UI component
import { Layout, Menu } from 'antd'
// Component
import Header from '@/layout/Header'
// routes
import MainRoutes from '@/router/MainRoutes'
// style
import MainStyle from './Main.module.less'
// type
import type { MenuInfo } from 'rc-menu/lib/interface'

const { Content, Sider } = Layout

const Main = () => {
  const {  menu } = useSelector(state => state.authSlice.data)
  const navigate = useNavigate()
  const onClick = ({ key }: MenuInfo): void => {
    navigate(key.toLocaleLowerCase())
    return
  }
  const [routes, setRoutes] = useState(MainRoutes)

  useEffect(() => {
    setRoutes(preState => {
      const state = preState.filter(item => {
        if (!item.isMenu) return item
        if (menu.indexOf(item.path) !== -1) return item
      })
      return state
    })
  }, [menu])



  return (
    <Layout className={MainStyle['layout']}>
      <Sider>
        <div className={MainStyle['logo']} />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClick}
          items={routes
            .filter(item => item.isMenu)
            .map((item, _index) => ({
              key: String(item.path),
              label: item.name,
            }))}
        />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className={MainStyle['site-layout-background']}
            style={{ padding: 24, minHeight: '100%' }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
