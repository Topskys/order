/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:22:51
 * @LastEditTime: 2023-03-01 19:57:27
 */
const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
}
export default getters
