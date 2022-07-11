import { Suspense, lazy, useEffect, useMemo } from 'react'
import { useRoutes, useNavigate, useLocation, useMatch } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'

import { Spin } from 'antd'

import MainRoutes from './MainRoutes'

export interface Router extends RouteObject {
  name?: string
}

// lazy
const Login = lazy(() => import('@/view/Login'))
const Main = lazy(() => import('@/view/Main'))
const NotAuth403 = lazy(() => import('@/view/NotAuth403'))
const NotFound = lazy(() => import('@/view/NotFound'))

// 可分为文件
const routes: Router[] = [
  {
    path: '/',
    name: 'Login',
    element: (
      <Suspense fallback={<Spin />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/Login',
    name: 'Login',
    element: (
      <Suspense fallback={<Spin />}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<Spin />}>
        <Main />
      </Suspense>
    ),
    children: MainRoutes,
  },
  {
    path: '/403',
    name: '403',
    element: (
      <Suspense fallback={<Spin />}>
        <NotAuth403 />
      </Suspense>
    ),
  },
  {
    path: '*',
    name: 'NotFound',
    element: (
      <Suspense fallback={<Spin />}>
        <NotFound />
      </Suspense>
    ),
  },
]

const Routers = () => {
  const data = useSelector(state => state.authSlice.data)
  const Route = useRoutes(routes)

  const roles = useMemo(() => data.roles.length, [data])
  const menu = useMemo(() => data.menu, [data])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log('roles', !roles)
    if (!roles) {
      navigate('/login')
    }
  }, [roles])

  // 匹配
  useEffect(() => {
    const { pathname } = location
    const path = pathname.toLocaleLowerCase()
    const menuPath = menu.map((item: string) => item.toLocaleLowerCase())
    const match = menuPath.findIndex(item => item === path)
    if (roles && /main/.test(path) && match === -1) {
      console.log('....403')
      navigate('/main/403')
      return
    }
  }, [location, menu, roles])

  return <>{Route}</>
}

export default Routers
