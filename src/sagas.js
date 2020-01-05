import { takeEvery, call, put } from 'redux-saga/effects'
import request from '@/utils/request.js' /*整体请求封装*/

import layoutSaga from '@/layout/saga'

import loginSaga from '@/views/login/saga'


// 根据action.type执行异步请求(sage)
function executeSaga(action) {
  return function*({ func }) {
    const params = action.payload

    //定义请求者
    const requester = () => request.post(`/api/${func}`, { params })
    // request.post('/portal/bts', {mfunc, func, params});//本地测试接口

    try {
      //调用请求者获取数据
      const json = yield call(requester)

      let typeMsg = ''
      switch (String(json.code)) {
        case '200':
          typeMsg = `${action.type}_success`
          break
        case '304':
          window.location.href = '/login'
          localStorage.clear()
          sessionStorage.clear()
          break
        default:
          typeMsg = `${action.type}_failure`
          break
      }

      //dispatch 一个 action 到 reducer 更新 state
      yield put({
        type: `${typeMsg}`,
        payload: json
      })
    } catch (error) {
      let typeMsg = `${action.type}_failure`
      yield put({
        type: `${typeMsg}`,
        payload: {
          msg: '请求超时',
          desc: '请求超时'
        }
      })
    }
  }
}

const sagas = Object.assign(
  {},
  loginSaga,
  layoutSaga
)

function* rootSaga() {
  // eslint-disable-next-line
  for (let key in sagas) {
    yield takeEvery(key, action => executeSaga(action)(sagas[key]))
  }
}

export default rootSaga
