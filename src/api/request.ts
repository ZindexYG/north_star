import axios from 'axios'

const axiosHttp = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  //超时时间
  timeout: 10000,
  // 表示跨域请求时是否需要使用凭证
  // withCredentials: true,
})

// 返回拦截
axiosHttp.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data?.code === 0) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res.data)
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error))
  },
)

export default axiosHttp
