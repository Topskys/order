
import request from '@/utils/request'

/**
 * 获取侧边栏菜单路由
 */
export const getMenu = () => request({ url: `/menu?t=${Date.now()}` })



