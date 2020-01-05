const loginSaga = {
  // 登入
  login: {
    mfunc: 'userManager',
    func: 'login'
  },
  // 登出
  logout: {
    mfunc: 'userManager',
    func: 'logout'
  },
  // 获取用户信息
  getUserById: {
    mfunc: 'userManager',
    func: 'getUserById'
  },
  // 修改秘密
  changePwd: {
    mfunc: 'userManager',
    func: 'changePwd'
  }
}

export default loginSaga
