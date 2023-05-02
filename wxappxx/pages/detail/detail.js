// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product: {
            poster: "/images/detail-01.jpg",
            sale_count: 4026,
            services: [{
                title: '3小时消毒保洁',
                price: 226
            }, {
                title: '4小时消毒保洁',
                price: 296
            }, {
                title: '5小时消毒保洁',
                price: 371
            }, {
                title: '6小时消毒保洁',
                price: 466
            }],
            notice: '服务须知。很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机',
            imgs: ["/images/test-01.jpg", "/images/test-02.jpg", "/images/test-03.jpg"],
        },
        cardActive:0,
        tabActive: 0,
        evaluations: [{
                avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                nickName: 'Topsky',
                gender: 'boy',
                phone: "18200001234",
                star_count: 5,
                content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                createdAt: "2023-4-27"
            },
            {
                avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                nickName: 'Topsky',
                gender: 'boy',
                phone: "18200001234",
                star_count: 5,
                content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                createdAt: "2023-4-27"
            },
            {
                avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                nickName: 'Topsky',
                gender: 'boy',
                phone: "18200001234",
                star_count: 5,
                content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                createdAt: "2023-4-27"
            },
            {
                avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                nickName: 'Topsky',
                gender: 'boy',
                phone: "18200001234",
                star_count: 5,
                content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                createdAt: "2023-4-27"
            }
        ]
    },
    onSelectHandler(e){
        console.log(e)
    },
    // change tab
    onChange(e) {
        this.setData({
            tabActive: e.detail.index || 0
        })
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})