/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:22:51
 * @LastEditTime: 2023-03-07 23:31:15
 */
const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  
  isCollapsed: state => state.app.isCollapsed,
  toolbar: state => state.app.toolbar,
}


export default getters
