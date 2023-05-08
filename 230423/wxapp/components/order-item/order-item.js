// components/order-item/order-item.js
Component({
    properties: {
        order: {
            type: Object,
            value: () => ({})
        }
    },
    data: {

    },
    methods: {
        clickHandler(e){
            this.triggerEvent('btnEvent',{
                item:e.currentTarget.dataset.item,
                btn:e.currentTarget.dataset.btn
            })
        }
    }
})