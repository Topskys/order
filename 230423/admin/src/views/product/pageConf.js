const tableConf = {
    t_config: {
        // 边框
        border: true,
        // 序号
        // index: true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
            {
                type: "text",
                prop: "title",
                label: "标题",
            },
            {
                type: "image",
                prop: "poster",
                label: "海报",
                align: "center",
                show_tooltip: false,
            },
            {
                prop: "description",
                label: "描述",
                show_tooltip: false,
            },
            {
                prop: "start_price",
                label:"起始价",
                cb: (data) => data.sale_price ? `￥${Number(data.sale_price).toFixed(2)}` : '未定价',
            },
            {
                prop: "sale_count",
                label: "已售",
            },
            {
                prop: "location",
                label: "服务区域",
            },
            {
                type: "function",
                prop: "status",
                label: "状态",
                cb: (data) => {
                    let type = 'warning'
                    let txt = '下架'
                    if (data.status) {
                        type = 'primary'
                        txt = '在售'
                    }
                    return `<div class="e-tag">
                    <span class='el-tag el-tag--${type} el-tag--light'>${txt}</span>
                    </div>`
                }
            },
            {
                type: "text",
                prop: "updatedAt",
                label: "更新日期",
                cb: function(data){
                    const date=new Date(data.updatedAt).toGMTString()
                    return new Date(date).toLocaleString()
                }
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                show_tooltip:false,
            },
        ],
        // 分页
        pagination: {
            show: true,
            align: "right",
            page: 1,
            pageSize: 10,
            total: 0,
        },
    },
}

export {
    tableConf,
}