import request from './request'

export interface LoginParamsType {
  username: string
  password: string
}

export const login = (params: LoginParamsType) => {
  return request.post('/mock/user/login', params)
}

export const logOut = () => {
  return request.post('/mock/user/logout')
}
