import request from '@/utils/request'
import { removeToken } from '@/utils/auth'

export function login(username, password) {
  return request({
    // url: '/user/login',
    url: '/api_auth/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user_info/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  removeToken()
  window.location.reload()
}
