// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    // 头部轮播数据（可选数据库配置）
    ,banners: [
        "https://ts1.cn.mm.bing.net/th?id=ABT5F805E56E027D0E8BF203231B8AAB9F056F4BAC6BA118ABD9031F73AA0E81B84&w=120&h=120&c=1&rs=1&qlt=80&o=6&dpr=1.5&pid=SANGAM",
        "https://ts3.cn.mm.bing.net/th?id=ABT7C13897317FFD5FEE094BCD9DD17097E24F226002C93DB310CAF0FFBDF738196&w=120&h=120&c=1&rs=1&qlt=80&o=6&dpr=1.5&pid=SANGAM",
        "https://cn.bing.com/rp/9pbbh3cSP4648TvJM1LY_0x72W4.png",
        "https://img2.baidu.com/it/u=2613853606,795500634&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500",
    ],
    // 地理位置
    locations:["福州","闽侯","长乐","连江","福清","莆田"],
    // 分类数据
    categories:[
        {label:"中式保洁",poster:"/images/category-1.png"},
        {label:"中式收纳",poster:"/images/category-1.png"},
        {label:"搬家服务",poster:"/images/category-1.png"},
        {label:"找人做饭",poster:"/images/category-1.png"},
    ],
    recommendList:[
        {title:"中式保洁",detail:'hao',poster:"/images/category-1.png"},
        {title:"中式收纳",detail:'hao',poster:"/images/category-1.png"},
        {title:"搬家服务",detail:'hao',poster:"/images/category-1.png"},
        {title:"找人做饭",detail:'hao',poster:"/images/category-1.png"},
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
