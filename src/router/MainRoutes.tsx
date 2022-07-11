import { Suspense, lazy, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import type { Router } from './index'

// lazy
const About = lazy(() => import('@/pages/About'))
const Table = lazy(() => import('@/pages/Table'))
const User = lazy(() => import('@/pages/User'))
const NotAuth403 = lazy(() => import('@/view/NotAuth403'))
const NotFound = lazy(() => import('@/view/NotFound'))

export interface MainRouter extends Router {
  isMenu: boolean
}

const MainRoutes: MainRouter[] = [
  {
    path: '/Main',
    isMenu: false,
    element: <Navigate to="/Main/Table" replace />,
  },
  {
    path: '/Main/Table',
    isMenu: true,
    name: 'Table',
    element: (
      <Suspense fallback={<Spin />}>
        <Table />
      </Suspense>
    ),
  },
  {
    path: '/Main/About',
    isMenu: true,
    name: 'About',
    element: (
      <Suspense fallback={<Spin />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '/Main/User',
    isMenu: false,
    name: 'User',
    element: (
      <Suspense fallback={<Spin />}>
        <User />
      </Suspense>
    ),
  },
  {
    path: '/Main/403',
    name: '403',
    isMenu: false,
    element: (
      <Suspense fallback={<Spin />}>
        <NotAuth403 />
      </Suspense>
    ),
  },
  {
    path: '/Main/*',
    isMenu: false,
    name: 'NotFound',
    element: (
      <Suspense fallback={<Spin />}>
        <NotFound />
      </Suspense>
    ),
  },
]

export default MainRoutes
