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
                prop: "employee_name",
                label: "名称",
                show_tooltip: false,
            },
            {
                type: "image",
                prop: "poster",
                label: "海报",
                align: "center",
                show_tooltip: false,
            },
            {
                prop: "experience",
                label: "服务经验",
                show_tooltip: false,
            },
            {
                prop: "skill",
                label: "技能",
                show_tooltip: false,
            },
            {
                prop: "description",
                label: "服务描述",
                show_tooltip: false,
            },
            {
                type:"function",
                prop: "services",
                label:"起始价",
                cb: (data) => {
                    return data.services[0].price ? `￥${Number(data.services[0].price).toFixed(2)}` : '未定价'
                }
            },
            {
                prop: "sale_count",
                label: "已售",
                show_tooltip: false,
            },
            {
                prop: "cate_title",
                label: "家政类别",
                show_tooltip: false,
            },
            {
                prop: "location",
                label: "服务区域",
                show_tooltip: false,
            },
            {
                type: "function",
                prop: "status",
                label: "状态",
                cb: (data) => {
                    let type = 'warning'
                    let txt = '下架'
                    if (data.status===true) {
                        type = 'primary'
                        txt = '可服务'
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
                },
                show_tooltip: false,
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