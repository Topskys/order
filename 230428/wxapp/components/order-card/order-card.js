// components/order-card/order-card.js
Component({
    properties: {
        order: {
            type: Object,
            value: () => ({})
        }
    },
    methods: {
        clickHandler(e) {
            this.triggerEvent('btnEvent', {
                item: e.currentTarget.dataset.item,
                btn: e.currentTarget.dataset.btn,
            })
        }
    }
})
