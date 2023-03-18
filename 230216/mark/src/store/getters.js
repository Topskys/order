/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:22:51
 * @LastEditTime: 2023-03-13 14:50:49
 */
const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,

  isCollapsed: state => state.app.isCollapsed,
  toolbar: state => state.app.toolbar,
}


export default getters
