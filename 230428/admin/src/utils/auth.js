/*
 * @Author: Topskys
 * @Date: 2023-03-28 10:10:46
 * @LastEditTime: 2023-03-28 16:09:45
 */
import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
