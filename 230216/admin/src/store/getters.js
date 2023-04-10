/*
 * @Author: Topskys
 * @Date: 2023-04-07 22:26:45
 * @LastEditTime: 2023-04-08 11:44:53
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar || "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  name: state => state.user.name
}
export default getters
