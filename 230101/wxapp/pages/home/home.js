// pages/home/home.js
import request from '../../utils/request.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 头部轮播数据
        banners: [],
        // 租房数据
        rentTime: {
            startDate: `${new Date().getMonth()+1}/${new Date().getDate()}`, // 入住时间
            endDate: `${new Date().getMonth()+1}/${new Date().getDate()+1}`, // 离店时间
            time: '共1晚', // 租出世间
        },
        show: false, // 控制选择时间区间的显隐
        // 房间列表数据
        rooms: [], // 房间数据数组
        page: 1, // 当前页
        pageSize: 10, // 当前页面数据大小
        total: 0, // 数据总条数
        // 筛选
        option: [{
                text: '全部',
                value: '全部'
            },
            {
                text: '大床',
                value: '大床'
            },
            {
                text: '单床',
                value: '单床'
            },
            {
                text: '双床',
                value: '双床'
            },
            {
                text: '三床',
                value: '三床'
            },
            {
                text: '圆床',
                value: '圆床'
            },
            {
                text: '单人床',
                value: '单人床'
            },
            {
                text: '双人床',
                value: '双人床'
            },
        ],
        switch: '全部', // value
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.getBanner();
        this.getDataList();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.setStorageSync('rentTime', this.data.rentTime)
    },

    /**
     * 生命周期函数--监听页面
     */
    onHide() {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.setData({
            page: ++this.data.page
        })
        this.getDataList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    getBanner() {
        request({
            url: 'banners'
        }).then(({
            data
        }) => {
            this.setData({
                banners: data
            })
        })
    },
    // 电话按钮的回调
    callHotel() {
        wx.makePhoneCall({
            phoneNumber: "15985233142",
        })
    },
    // 控制选择时间区间的显隐回调
    onDisplay() {
        this.setData({
            show: !this.data.show
        });
    },
    // 格式化日期
    formatDate(date) {
        date = new Date(date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    // 计算入住时长（晚）
    calcTime(start, end) {
        [start, end] = [new Date(start).getTime(), new Date(end).getTime()]
        return Math.ceil((end - start) / (1 * 24 * 60 * 60 * 1000))
    },
    // 选择时间区间确认按钮的回调
    onConfirm(e) {
        const [start, end] = e.detail;
        this.setData({
            show: false,
            rentTime: {
                startDate: this.formatDate(start),
                endDate: this.formatDate(end),
                time: `共${this.calcTime(start,end)}晚`
            }
        });
        wx.setStorageSync('rentTime', this.data.rentTime)
    },
    // 获取房间列表数据
    getDataList(where = 1) {
        request({
            url: `rooms/findAll?page=${this.data.page}&pageSize=${this.data.pageSize}&keyword=${this.data.switch!=='全部'?this.data.switch:''}`, // &keyword=${this.data.switch}
        }).then(({
            data,
            total
        }) => {
            this.setData({
                rooms: where === 1 ? [...this.data.rooms, ...data] : data,
                total
            })
        })
    },
    // 预定按钮的回调
    navToDetail(e) {
        wx.navigateTo({
            url: `/pages/room-detail/room-detail?_id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
        })
    },
    // 筛选的回调
    onSwitchChange(e) {
        this.setData({
            switch: e.detail
        });
        this.getDataList(2)
    },
})