import { createSelector } from 'reselect'

const layoutReducer = {
  layoutModalReducer: (
    state = {
      visible: false,
      destroyOnClose: true,
      maskClosable: true
    },
    action
  ) => {
    switch (action.type) {
      case 'layout_modal_show':
        return Object.assign({}, state, { visible: true }, action.payload)
      case 'layout_modal_hide':
        return Object.assign({}, state, { visible: false, title: '' }, action.payload)
      default:
        return state
    }
  },
}

// 弹窗
export const modalShow = payload => ({ type: 'layout_modal_show', payload })
export const modalHide = payload => ({ type: 'layout_modal_hide', payload })
export const selectLayoutModalReducer = createSelector(
  state => state.layoutModalReducer,
  layoutModalReducer => layoutModalReducer
)
// 登录状态
export const logout = payload => ({ type: 'logout' })
export const InitAuthStatus = () => ({ type: 'init_auth_status' })
export const InitGetUserInfo = () => ({ type: 'init_getUserInfo' })
export const auth_status = createSelector(
  state => state.auth_status,
  auth_status => auth_status
)

export default layoutReducer
