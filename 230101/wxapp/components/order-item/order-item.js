// components/order-item/order-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: {
            type: Object,
            value: ""
        },
        btn: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleDetail(e) {
            //  子传父
            this.triggerEvent('toDetail',e.currentTarget.dataset.item)
        },
        btnEvent(e){
            this.triggerEvent('btnEvent',{item:e.currentTarget.dataset.item,btn:e.currentTarget.dataset.btn})
        }
    },
    observers:{
        'config':function (v) {}
    },
})