import { createSelector } from 'reselect'

const loginReducer = {
  auth_status: (state = { status: '', msg: '', userInfo: null }, action) => {
    switch (action.type) {
      case 'login':
      case 'logout':
        return Object.assign({}, state, {
          status: 'loading',
          msg: 'loading...'
        })
      case 'login_success':
        return Object.assign({}, state, {
          status: 'success',
          msg: '登录成功',
          userInfo: action.payload.result.userInfo
        })
      case 'logout_success':
        return Object.assign({}, state, {
          status: 'success',
          msg: '退出成功',
          userInfo: null
        })
      case 'login_failure':
      case 'logout_failure':
        return Object.assign({}, state, {
          status: 'error',
          msg: action.payload.desc,
          userInfo: null
        })
      case 'init_auth_status':
        return Object.assign({}, state, {
          msg: '',
          status: '',
          userInfo: null
        })
      default:
        return state
    }
  },
  getUserInfo: (state = { status: '', msg: '', userInfo: {} }, action) => {
    switch (action.type) {
      case 'getUserById':
        return Object.assign({}, state, {
          status: 'loading',
          msg: 'loading...'
        })
      case 'getUserById_success':
        return Object.assign({}, state, {
          status: 'success',
          msg: action.payload.desc,
          userInfo: action.payload.result.user
        })
      case 'getUserById_failure':
        return Object.assign({}, state, {
          status: 'error',
          msg: action.payload.desc,
          userInfo: {}
        })
      case 'init_getUserInfo':
        return Object.assign({}, state, {
          status: '',
          msg: '',
          userInfo: {}
        })
      default:
        return state
    }
  },
  changePwd_status: (state = { status: '', msg: '' }, action) => {
    switch (action.type) {
      case 'changePwd':
        return Object.assign({}, state, {
          status: 'loading',
          msg: 'loading...'
        })
      case 'changePwd_success':
        return Object.assign({}, state, {
          status: 'success',
          msg: action.payload.desc
        })
      case 'changePwd_failure':
        return Object.assign({}, state, {
          status: 'error',
          msg: action.payload.desc
        })
      case 'init_changePwd_status':
        return Object.assign({}, state, {
          status: '',
          msg: ''
        })
      default:
        return state
    }
  }
}

// 登录
export const Login = payload => ({ type: 'login', payload })
// 登出
export const logout = payload => ({ type: 'logout', payload })
// 获取用户信息
export const GetUserById = payload => ({ type: 'getUserById', payload })
// 修改密码
export const ChangePwd = payload => ({ type: 'changePwd', payload })

/* 清空信息状态 */
// 登录状态
export const InitAuthStatus = () => ({ type: 'init_auth_status' })
// 获取用户信息
export const InitGetUserInfo = () => ({ type: 'init_getUserInfo' })
/* 返回状态信息 */

export const auth_status = createSelector(
  state => state.auth_status,
  auth_status => auth_status
)
export const getUserInfo = createSelector(
  state => state.getUserInfo,
  getUserInfo => getUserInfo
)
export const changePwd_status = createSelector(
  state => state.changePwd_status,
  changePwd_status => changePwd_status
)

export default loginReducer
