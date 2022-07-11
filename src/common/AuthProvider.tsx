import React, { useState } from 'react'
import { fakeAuthProvider } from '@/utils/auth'

// 验证上下文空间
let AuthContext = React.createContext(null)

// 利用 useContext 导出验证上下文，供其它组件使用
export function useAuth() {
  return React.useContext(AuthContext)
}

// 验证提供者
export default function AuthProvider({ children }) {
  // 创建验证组件状态
  let [user, setUser] = useState(null)

  // 登录验证
  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  // 退出登录
  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  let value = { user, signin, signout }

  // 传递验证上下文(AuthContext)属性给嵌套的插槽children子组件(App)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
