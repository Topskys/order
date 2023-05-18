// components/product-list/index.js
import request from '../../utils/request' 
Component({
    properties: {

    },
    data: {
        leftList: [],
        rightList: []
    },
    attached:function(){
        this.getDataList()
    },
    methods: {
        // 获取数据列表
        getDataList() {
            request({
                url: 'product'
            }).then(res => {
                const [arr,arr0,arr1]=[res.data||[],[],[]]
                    arr.map((item, i) => (i > 0 && i % 2) ? arr1.push(item) : arr0.push(item))
                    this.setData({
                        leftList: arr0,
                        rightList: arr1
                    })
            })
        },
        // 跳转详情
        toDetail(e) {
            const item = e.currentTarget.dataset.item
            wx.navigateTo({
                url: `/pages/detail/detail?product_id=${item._id}`,
            })
        },
    }
})